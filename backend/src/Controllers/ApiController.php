<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Data\PortfolioData;

final class ApiController
{
    public function profile(): void
    {
        $this->json(PortfolioData::profile());
    }

    public function experience(): void
    {
        $this->json(PortfolioData::experience());
    }

    public function projects(): void
    {
        $this->json(PortfolioData::projects());
    }

    public function project(string $id): void
    {
        $projects = PortfolioData::projects();
        foreach ($projects as $project) {
            if ($project['id'] === $id) {
                $this->json($project);
                return;
            }
        }

        http_response_code(404);
        $this->json(['error' => 'Project not found']);
    }

    public function skills(): void
    {
        $this->json(PortfolioData::skills());
    }

    public function education(): void
    {
        $this->json(PortfolioData::education());
    }

    public function certifications(): void
    {
        $this->json(PortfolioData::certifications());
    }

    public function teaching(): void
    {
        $this->json(PortfolioData::teaching());
    }

    public function all(): void
    {
        $this->json([
            'profile' => PortfolioData::profile(),
            'experience' => PortfolioData::experience(),
            'projects' => PortfolioData::projects(),
            'skills' => PortfolioData::skills(),
            'education' => PortfolioData::education(),
            'certifications' => PortfolioData::certifications(),
            'teaching' => PortfolioData::teaching(),
        ]);
    }

    /**
     * @param array<string, mixed>|list<mixed> $data
     */
    private function json(array $data): void
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Cache-Control: public, max-age=300');
        echo json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
