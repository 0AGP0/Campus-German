<?php
/**
 * Özel evrak formu: tarayıcı → aynı origin (CORS yok) → bu dosya → portal (x-webhook-secret sunucuda).
 * Kanonik URL: /private-documents-proxy.php (public_html kökünde; /api/ altı 404 verdiyse bu dosyayı kullanın)
 *
 * Kurulum: data/private-documents-proxy.config.php oluşturun (örnek: private-documents-proxy.config.example.php).
 */
declare(strict_types=1);

header('X-Robots-Tag: noindex, nofollow');

$configPath = __DIR__ . '/data/private-documents-proxy.config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'error' => 'Proxy yapılandırması yok',
        'hint' => 'data/private-documents-proxy.config.example.php dosyasını private-documents-proxy.config.php olarak kopyalayıp doldurun.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$config = require $configPath;
$target = isset($config['target_url']) ? (string) $config['target_url'] : 'https://portal.campusgerman.com/api/webhooks/private-documents';
$secret = isset($config['webhook_secret']) ? (string) $config['webhook_secret'] : '';

if ($secret === '') {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'webhook_secret boş (config)'], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Method Not Allowed', 'hint' => 'Form POST ile çağrılmalı. GET testi 405 normal.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$postfields = $_POST;
foreach ($_FILES as $key => $file) {
    if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
        continue;
    }
    $mime = isset($file['type']) && $file['type'] !== ''
        ? (string) $file['type']
        : 'application/octet-stream';
    $name = isset($file['name']) ? (string) $file['name'] : 'upload';
    $postfields[$key] = new CURLFile($file['tmp_name'], $mime, $name);
}

$ch = curl_init($target);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $postfields,
    CURLOPT_HTTPHEADER => [
        'x-webhook-secret: ' . $secret,
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 120,
]);

$response = curl_exec($ch);
$errno = curl_errno($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($errno !== 0) {
    http_response_code(502);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'error' => 'Portal erişilemedi',
        'detail' => curl_strerror($errno),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code($httpCode > 0 ? $httpCode : 502);
header('Content-Type: application/json; charset=utf-8');
echo is_string($response) ? $response : '';
