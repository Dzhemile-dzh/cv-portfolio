<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Data\PortfolioData;

final class SeoController
{
    /**
     * @return array<string, mixed>
     */
    private function config(): array
    {
        /** @var array<string, mixed> $config */
        $config = require dirname(__DIR__, 2) . '/config/app.php';
        return $config;
    }

    public function metaJson(): void
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        echo json_encode($this->buildMeta(), JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    public function sitemap(): void
    {
        $config = $this->config();
        $baseUrl = rtrim((string) $config['site_url'], '/');
        $projects = PortfolioData::projects();

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
        $config = $this->config();
        $baseUrl = rtrim((string) $config['site_url'], '/');

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
        $config = $this->config();
        $profile = PortfolioData::profile();

        return [
            'title' => $config['name'] . ' | ' . $config['title'],
            'description' => $config['description'],
            'keywords' => implode(', ', $config['keywords']),
            'author' => $config['name'],
            'canonical' => $config['site_url'],
            'image' => $config['site_url'] . ($profile['photo'] ?? '/profile.jpg'),
            'og' => [
                'type' => 'website',
                'title' => $config['name'] . ' - Full-Stack Web Developer',
                'description' => $config['description'],
                'url' => $config['site_url'],
                'site_name' => $config['name'] . ' Portfolio',
                'image' => $config['site_url'] . ($profile['photo'] ?? '/profile.jpg'),
            ],
            'twitter' => [
                'card' => 'summary_large_image',
                'title' => $config['name'] . ' - Full-Stack Web Developer',
                'description' => $config['description'],
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
                'url' => $config['site_url'],
                'image' => $config['site_url'] . ($profile['photo'] ?? '/profile.jpg'),
                'sameAs' => array_column($profile['socials'], 'url'),
                'knowsAbout' => ['PHP', 'React', 'JavaScript', 'Drupal', 'Data Science', 'MySQL', 'Roblox', 'Minecraft Education'],
            ],
        ];
    }
}
