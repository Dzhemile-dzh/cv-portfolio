<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Contracts\PortfolioRepositoryInterface;
use App\Http\JsonResponse;

final class ApiController
{
    public function __construct(
        private readonly PortfolioRepositoryInterface $portfolio,
    ) {
    }

    public function profile(): void
    {
        JsonResponse::send($this->portfolio->profile());
    }

    public function experience(): void
    {
        JsonResponse::send($this->portfolio->experience());
    }

    public function projects(): void
    {
        JsonResponse::send($this->portfolio->projects());
    }

    public function project(string $id): void
    {
        $project = $this->portfolio->findProject($id);

        if ($project === null) {
            JsonResponse::send(['error' => 'Project not found'], 404);
            return;
        }

        JsonResponse::send($project);
    }

    public function skills(): void
    {
        JsonResponse::send($this->portfolio->skills());
    }

    public function education(): void
    {
        JsonResponse::send($this->portfolio->education());
    }

    public function certifications(): void
    {
        JsonResponse::send($this->portfolio->certifications());
    }

    public function teaching(): void
    {
        JsonResponse::send($this->portfolio->teaching());
    }

    public function all(): void
    {
        JsonResponse::send($this->portfolio->all());
    }
}
