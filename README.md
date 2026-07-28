# Dzhemile Ahmed — CV Portfolio Website

Modern, SEO-optimized portfolio website built with **React 19** and **PHP 8.5**.

## Features

- **Modern UI/UX** — Dark theme, glassmorphism, Framer Motion animations, responsive design
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, JSON-LD structured data, sitemap.xml, robots.txt
- **Project Showcase** — Detailed descriptions, technology tags, and external links
- **REST API** — PHP 8.5 backend serving portfolio data
- **Performance** — Code splitting, lazy loading, optimized build output

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion |
| Backend  | PHP 8.5, PSR-4 autoloading          |
| SEO      | react-helmet-async, JSON-LD, sitemap |

## Quick Start

### Prerequisites

- PHP 8.4+ (8.5 recommended)
- Composer
- Node.js 20+

### 1. Backend Setup

```bash
cd backend
composer install
php -S localhost:8080 -t public
```

### 2. Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — API requests are proxied to the PHP backend.

### 3. Production Build

```bash
cd frontend
npm run build

cd ../backend
php -S localhost:8080 -t public
```

The PHP server serves the built React app from `frontend/dist` and handles API routes.

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/all`            | Full portfolio data      |
| GET    | `/api/profile`        | Profile information      |
| GET    | `/api/experience`     | Work experience          |
| GET    | `/api/projects`       | All projects             |
| GET    | `/api/projects/{id}`  | Single project           |
| GET    | `/api/skills`         | Skills by category       |
| GET    | `/api/education`      | Education history        |
| GET    | `/api/certifications` | Certifications           |
| GET    | `/api/seo/meta`       | SEO metadata + JSON-LD   |
| GET    | `/sitemap.xml`        | XML sitemap              |
| GET    | `/robots.txt`         | Robots file              |

## Configuration

Edit `backend/config/app.php` to update site URL, meta description, and keywords for production deployment.

## Deployment

1. Build the frontend: `cd frontend && npm run build`
2. Point your web server document root to `backend/public`
3. Ensure URL rewriting routes all non-file requests through `index.php`
4. Update `site_url` in `backend/config/app.php`

### Apache (.htaccess included)

The project includes an Apache configuration in `backend/public/.htaccess`.

## License

Private portfolio — © Dzhemile Ahmed
