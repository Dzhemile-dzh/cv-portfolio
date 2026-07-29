<?php

declare(strict_types=1);

require dirname(__DIR__) . '/vendor/autoload.php';

use App\AppFactory;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = $_SERVER['REQUEST_URI'] ?? '/';

if ($method === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

$frontendDist = dirname(__DIR__, 2) . '/frontend/dist';
$path = parse_url($uri, PHP_URL_PATH) ?? '/';

if ($method === 'GET' && str_starts_with($path, '/api') === false
    && $path !== '/sitemap.xml' && $path !== '/robots.txt'
    && is_dir($frontendDist)) {
    $filePath = $frontendDist . ($path === '/' ? '/index.html' : $path);

    if (is_file($filePath)) {
        $ext = pathinfo($filePath, PATHINFO_EXTENSION);
        $mimeTypes = [
            'html' => 'text/html',
            'css' => 'text/css',
            'js' => 'application/javascript',
            'json' => 'application/json',
            'svg' => 'image/svg+xml',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'woff2' => 'font/woff2',
        ];
        header('Content-Type: ' . ($mimeTypes[$ext] ?? 'application/octet-stream') . '; charset=utf-8');
        readfile($filePath);
        exit;
    }

    if (is_file($frontendDist . '/index.html')) {
        header('Content-Type: text/html; charset=utf-8');
        readfile($frontendDist . '/index.html');
        exit;
    }
}

$app = AppFactory::create();
$app['router']->dispatch($method, $uri);
