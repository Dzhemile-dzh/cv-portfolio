<?php

declare(strict_types=1);

namespace App\Http;

final class JsonResponse
{
    /**
     * @param array<string, mixed>|list<mixed> $data
     */
    public static function send(array $data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Cache-Control: public, max-age=300');
        echo json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
