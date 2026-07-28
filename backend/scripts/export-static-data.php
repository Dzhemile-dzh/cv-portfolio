<?php

declare(strict_types=1);

require dirname(__DIR__) . '/vendor/autoload.php';

use App\Controllers\SeoController;
use App\Data\PortfolioData;

$all = [
    'profile' => PortfolioData::profile(),
    'experience' => PortfolioData::experience(),
    'projects' => PortfolioData::projects(),
    'skills' => PortfolioData::skills(),
    'education' => PortfolioData::education(),
    'certifications' => PortfolioData::certifications(),
    'teaching' => PortfolioData::teaching(),
];

$dir = dirname(__DIR__, 2) . '/frontend/public/data';
if (!is_dir($dir) && !mkdir($dir, 0777, true) && !is_dir($dir)) {
    throw new RuntimeException('Unable to create data directory');
}

$flags = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR;

file_put_contents($dir . '/portfolio.json', json_encode($all, $flags));
file_put_contents($dir . '/seo.json', json_encode((new SeoController())->buildMeta(), $flags));

echo "Exported static JSON to frontend/public/data/\n";
