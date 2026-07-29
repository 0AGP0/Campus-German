<?php
/**
 * Booking ödeme: tarayıcı → aynı origin → Make webhook → Stripe.
 * Embedded: clientSecret (+ publishableKey)
 * Hosted yedek: checkoutUrl (checkout.stripe.com)
 *
 * Kanonik URL: /booking-pay-proxy.php
 * Kurulum (isteğe bağlı): data/booking-pay-proxy.config.php
 */
declare(strict_types=1);

header('X-Robots-Tag: noindex, nofollow');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['error' => 'Method Not Allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

$raw = file_get_contents('php://input');
if ($raw === false || trim($raw) === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Boş istek gövdesi'], JSON_UNESCAPED_UNICODE);
    exit;
}

$payload = json_decode($raw, true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Geçersiz JSON'], JSON_UNESCAPED_UNICODE);
    exit;
}

$paymentChoice = (string) ($payload['paymentChoice'] ?? '');
if ($paymentChoice !== 'pay_now' && $paymentChoice !== 'reservation') {
    http_response_code(400);
    echo json_encode(['error' => 'paymentChoice pay_now veya reservation olmalı'], JSON_UNESCAPED_UNICODE);
    exit;
}

$configPath = __DIR__ . '/data/booking-pay-proxy.config.php';
$config = is_file($configPath) ? require $configPath : [];
$target = isset($config['make_webhook_url']) && $config['make_webhook_url'] !== ''
    ? (string) $config['make_webhook_url']
    : 'https://hook.eu2.make.com/40s1h4a3wra21aszpa9y9erfsfooso47';
$publishableKey = isset($config['stripe_publishable_key'])
    ? trim((string) $config['stripe_publishable_key'])
    : '';

$ch = curl_init($target);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $raw,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_HEADER => true,
    CURLOPT_TIMEOUT => 60,
]);

$response = curl_exec($ch);
$errno = curl_errno($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($errno !== 0 || !is_string($response)) {
    http_response_code(502);
    echo json_encode([
        'error' => 'Make webhook erişilemedi',
        'detail' => $errno !== 0 ? curl_strerror($errno) : 'empty response',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$checkoutUrl = '';
$clientSecret = '';

if (preg_match('/^location:\s*(.+)$/im', $response, $matches)) {
    $checkoutUrl = trim($matches[1]);
}

$parts = preg_split("/\r\n\r\n|\n\n/", $response, 2);
$body = isset($parts[1]) ? trim($parts[1]) : '';
if ($body !== '' && ($httpCode === 200 || $httpCode === 201 || $clientSecret === '')) {
    $json = json_decode($body, true);
    if (is_array($json)) {
        if ($checkoutUrl === '') {
            $checkoutUrl = (string) ($json['checkoutUrl'] ?? $json['checkout_url'] ?? '');
        }
        $clientSecret = (string) (
            $json['clientSecret']
            ?? $json['client_secret']
            ?? ''
        );
        if ($publishableKey === '' && !empty($json['publishableKey'])) {
            $publishableKey = trim((string) $json['publishableKey']);
        }
        if ($publishableKey === '' && !empty($json['publishable_key'])) {
            $publishableKey = trim((string) $json['publishable_key']);
        }
    }
}

$out = ['ok' => true];

if ($clientSecret !== '' && strncmp($clientSecret, 'cs_', 3) === 0) {
    $out['mode'] = 'embedded';
    $out['clientSecret'] = $clientSecret;
    if ($publishableKey !== '') {
        $out['publishableKey'] = $publishableKey;
    }
    http_response_code(200);
    echo json_encode($out, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($checkoutUrl !== '' && stripos($checkoutUrl, 'checkout.stripe.com') !== false) {
    $out['mode'] = 'hosted';
    $out['checkoutUrl'] = $checkoutUrl;
    http_response_code(200);
    echo json_encode($out, JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(502);
echo json_encode([
    'error' => 'Stripe clientSecret veya checkout URL alınamadı',
    'upstreamStatus' => $httpCode,
], JSON_UNESCAPED_UNICODE);
