<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Contracts\PortfolioRepositoryInterface;
use App\Http\JsonResponse;

final class SeoController
{
    /**
     * @param array<string, mixed> $config
     */
    public function __construct(
        private readonly PortfolioRepositoryInterface $portfolio,
        private readonly array $config,
    ) {
    }

    public function metaJson(): void
    {
        JsonResponse::send($this->buildMeta());
    }

    public function sitemap(): void
    {
        $baseUrl = rtrim((string) $this->config['site_url'], '/');
        $projects = $this->portfolio->projects();

        $urls = [
            ['loc' => $baseUrl . '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
            ['loc' => $baseUrl . '/#about', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => $baseUrl . '/#experience', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => $baseUrl . '/#projects', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['loc' => $baseUrl . '/#skills', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['loc' => $baseUrl . '/#contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ];

        foreach ($projects as $project) {
            $urls[] = [
                'loc' => $baseUrl . '/#projects/' . $project['id'],
                'priority' => '0.6',
                'changefreq' => 'monthly',
            ];
        }

        header('Content-Type: application/xml; charset=utf-8');
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($urls as $url) {
            echo "  <url>\n";
            echo '    <loc>' . htmlspecialchars($url['loc'], ENT_XML1) . "</loc>\n";
            echo '    <changefreq>' . $url['changefreq'] . "</changefreq>\n";
            echo '    <priority>' . $url['priority'] . "</priority>\n";
            echo "  </url>\n";
        }

        echo '</urlset>';
    }

    public function robots(): void
    {
        $baseUrl = rtrim((string) $this->config['site_url'], '/');

        header('Content-Type: text/plain; charset=utf-8');
        echo "User-agent: *\n";
        echo "Allow: /\n";
        echo "Sitemap: {$baseUrl}/sitemap.xml\n";
    }

    /**
     * @return array<string, mixed>
     */
    public function buildMeta(): array
    {
        $profile = $this->portfolio->profile();

        return [
            'title' => $this->config['name'] . ' | ' . $this->config['title'],
            'description' => $this->config['description'],
            'keywords' => implode(', ', $this->config['keywords']),
            'author' => $this->config['name'],
            'canonical' => $this->config['site_url'],
            'image' => $this->config['site_url'] . ($profile['photo'] ?? '/profile.jpg'),
            'og' => [
                'type' => 'website',
                'title' => $this->config['name'] . ' - Full-Stack Web Developer',
                'description' => $this->config['description'],
                'url' => $this->config['site_url'],
                'site_name' => $this->config['name'] . ' Portfolio',
                'image' => $this->config['site_url'] . ($profile['photo'] ?? '/profile.jpg'),
            ],
            'twitter' => [
                'card' => 'summary_large_image',
                'title' => $this->config['name'] . ' - Full-Stack Web Developer',
                'description' => $this->config['description'],
            ],
            'jsonLd' => [
                '@context' => 'https://schema.org',
                '@type' => 'Person',
                'name' => $profile['name'],
                'jobTitle' => $profile['title'],
                'description' => $profile['about'],
                'email' => $profile['email'],
                'telephone' => $profile['phone'],
                'address' => [
                    '@type' => 'PostalAddress',
                    'addressLocality' => 'Varna',
                    'addressCountry' => 'BG',
                ],
                'url' => $this->config['site_url'],
                'image' => $this->config['site_url'] . ($profile['photo'] ?? '/profile.jpg'),
                'sameAs' => array_column($profile['socials'], 'url'),
                'knowsAbout' => ['PHP', 'React', 'JavaScript', 'Drupal', 'Data Science', 'MySQL', 'Cursor', 'AI Agents', 'Stripe', 'EmailJS', 'Roblox', 'Minecraft Education'],
            ],
        ];
    }
}
