<?php

declare(strict_types=1);

namespace App\Contracts;

interface PortfolioRepositoryInterface
{
    /**
     * @return array<string, mixed>
     */
    public function profile(): array;

    /**
     * @return list<array<string, mixed>>
     */
    public function experience(): array;

    /**
     * @return list<array<string, mixed>>
     */
    public function projects(): array;

    /**
     * @return array<string, mixed>|null
     */
    public function findProject(string $id): ?array;

    /**
     * @return array<string, list<string>>
     */
    public function skills(): array;

    /**
     * @return list<array<string, mixed>>
     */
    public function education(): array;

    /**
     * @return list<array<string, mixed>>
     */
    public function certifications(): array;

    /**
     * @return array<string, mixed>
     */
    public function teaching(): array;

    /**
     * @return array<string, mixed>
     */
    public function all(): array;
}
