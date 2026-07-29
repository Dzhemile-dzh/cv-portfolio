<?php

declare(strict_types=1);

namespace App;

use App\Controllers\ApiController;
use App\Controllers\SeoController;
use App\Contracts\PortfolioRepositoryInterface;
use App\Data\InMemoryPortfolioRepository;

/**
 * Composition root — explicit manual dependency injection.
 */
final class AppFactory
{
    /**
     * @return array{
     *     config: array<string, mixed>,
     *     portfolio: PortfolioRepositoryInterface,
     *     api: ApiController,
     *     seo: SeoController,
     *     router: Router
     * }
     */
    public static function create(): array
    {
        /** @var array<string, mixed> $config */
        $config = require dirname(__DIR__) . '/config/app.php';

        $portfolio = new InMemoryPortfolioRepository();
        $api = new ApiController($portfolio);
        $seo = new SeoController($portfolio, $config);
        $router = new Router($api, $seo);

        return [
            'config' => $config,
            'portfolio' => $portfolio,
            'api' => $api,
            'seo' => $seo,
            'router' => $router,
        ];
    }
}
