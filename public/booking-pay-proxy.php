<?php
/**
 * Booking ödeme: tarayıcı → aynı origin → Make webhook → Stripe checkout URL (hash dahil).
 * Kanonik URL: /booking-pay-proxy.php
 *
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

if (($payload['paymentChoice'] ?? '') !== 'pay_now') {
    http_response_code(400);
    echo json_encode(['error' => 'paymentChoice pay_now olmalı'], JSON_UNESCAPED_UNICODE);
    exit;
}

$configPath = __DIR__ . '/data/booking-pay-proxy.config.php';
$config = is_file($configPath) ? require $configPath : [];
$target = isset($config['make_webhook_url']) && $config['make_webhook_url'] !== ''
    ? (string) $config['make_webhook_url']
    : 'https://hook.eu2.make.com/40s1h4a3wra21aszpa9y9erfsfooso47';

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

if (preg_match('/^location:\s*(.+)$/im', $response, $matches)) {
    $checkoutUrl = trim($matches[1]);
}

if ($checkoutUrl === '' && ($httpCode === 200 || $httpCode === 201)) {
    $parts = preg_split("/\r\n\r\n|\n\n/", $response, 2);
    $body = isset($parts[1]) ? trim($parts[1]) : '';
    if ($body !== '') {
        $json = json_decode($body, true);
        if (is_array($json)) {
            $checkoutUrl = (string) ($json['checkoutUrl'] ?? $json['checkout_url'] ?? '');
        }
    }
}

if ($checkoutUrl === '' || stripos($checkoutUrl, 'checkout.stripe.com') === false) {
    http_response_code(502);
    echo json_encode([
        'error' => 'Stripe checkout URL alınamadı',
        'upstreamStatus' => $httpCode,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(200);
echo json_encode(['ok' => true, 'checkoutUrl' => $checkoutUrl], JSON_UNESCAPED_UNICODE);
