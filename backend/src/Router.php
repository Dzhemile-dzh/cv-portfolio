<?php

declare(strict_types=1);

namespace App;

use App\Controllers\ApiController;
use App\Controllers\SeoController;

final class Router
{
    public function __construct(
        private readonly ApiController $api = new ApiController(),
        private readonly SeoController $seo = new SeoController(),
    ) {
    }

    public function dispatch(string $method, string $uri): void
    {
        $path = parse_url($uri, PHP_URL_PATH) ?? '/';
        $path = rtrim($path, '/') ?: '/';

        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('Referrer-Policy: strict-origin-when-cross-origin');

        match (true) {
            $method === 'GET' && $path === '/api/profile' => $this->api->profile(),
            $method === 'GET' && $path === '/api/experience' => $this->api->experience(),
            $method === 'GET' && $path === '/api/projects' => $this->api->projects(),
            $method === 'GET' && str_starts_with($path, '/api/projects/') => $this->api->project(substr($path, 14)),
            $method === 'GET' && $path === '/api/skills' => $this->api->skills(),
            $method === 'GET' && $path === '/api/education' => $this->api->education(),
            $method === 'GET' && $path === '/api/certifications' => $this->api->certifications(),
            $method === 'GET' && $path === '/api/teaching' => $this->api->teaching(),
            $method === 'GET' && $path === '/api/all' => $this->api->all(),
            $method === 'GET' && $path === '/sitemap.xml' => $this->seo->sitemap(),
            $method === 'GET' && $path === '/robots.txt' => $this->seo->robots(),
            $method === 'GET' && $path === '/api/seo/meta' => $this->seo->metaJson(),
            default => $this->notFound(),
        };
    }

    private function notFound(): void
    {
        http_response_code(404);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Not found'], JSON_THROW_ON_ERROR);
    }
}
