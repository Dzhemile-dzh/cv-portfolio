# Dzhemile Ahmed - CV Portfolio

Colorful personal portfolio built with **React 19** and **PHP 8.5**.

Live source: [github.com/Dzhemile-dzh/cv-portfolio](https://github.com/Dzhemile-dzh/cv-portfolio)

## Stack

| Layer    | Tools |
|----------|--------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion |
| Backend  | PHP 8.5, Composer (PSR-4), JSON API |
| SEO      | Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt |

## Local development

**Requirements:** PHP 8.4+, Composer, Node.js 20+

```bash
# API
cd backend
composer install
php -S localhost:8080 -t public

# UI (new terminal)
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` to the PHP server.

## Production

```bash
cd frontend
npm run build

cd ../backend
php -S localhost:8080 -t public
```

Or deploy with Apache/Nginx:

1. Set document root to `backend/public`
2. Route non-file requests to `index.php` (`.htaccess` is included for Apache)
3. Update `site_url` in `backend/config/app.php`

### Vercel (static frontend)

This repo is configured for Vercel via `vercel.json` (builds `frontend/`).

1. Import the GitHub repo in Vercel
2. Leave Root Directory empty (repo root)
3. Deploy - no PHP needed on Vercel; content loads from `frontend/public/data/*.json`

Optional: set `OPENAI_API_KEY` in Vercel env vars to power the CV chat with GPT.
Without it, the chat still works using a local CV knowledge engine.

Refresh static data after CV content changes:

```bash
cd backend
php scripts/export-static-data.php
```

## Config

`backend/config/app.php` holds site URL, social links, meta description, and SEO keywords.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/all` | Full portfolio payload |
| GET | `/api/profile` | Profile |
| GET | `/api/experience` | Work history |
| GET | `/api/projects` | Projects |
| GET | `/api/projects/{id}` | Single project |
| GET | `/api/skills` | Skills |
| GET | `/api/education` | Education |
| GET | `/api/certifications` | Certifications |
| GET | `/api/teaching` | Teaching |
| GET | `/api/seo/meta` | SEO meta + JSON-LD |
| GET | `/sitemap.xml` | Sitemap |
| GET | `/robots.txt` | Robots |

## License

© Dzhemile Ahmed
