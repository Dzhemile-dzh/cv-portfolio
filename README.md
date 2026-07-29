# Dzhemile Ahmed — CV Portfolio

Personal portfolio for Dzhemile Ahmed.

Live: [cv-portfolio-ten-beryl.vercel.app](https://cv-portfolio-ten-beryl.vercel.app/) · Source: [github.com/Dzhemile-dzh/cv-portfolio](https://github.com/Dzhemile-dzh/cv-portfolio)

## Stack

| Layer | Tools |
|-------|--------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion |
| Backend | PHP 8.4+, Composer (PSR-4), JSON REST API |
| Deploy | Vercel (static frontend + optional serverless chat) |
| SEO | Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt |

## Specifics

### Multilingual (EN / BG)
- Language switcher in the navbar (`EN` / `BG`)
- UI chrome and portfolio content both localize
- Locale persisted in `localStorage`; English is default
- Static payloads: `portfolio.json` / `portfolio.bg.json`, `seo.json` / `seo.bg.json`

### CV Chatbot
- Floating chat widget trained on real CV data
- Local rule-based engine works with no API key (EN + BG intents)
- Optional OpenAI via `api/chat.js` when `OPENAI_API_KEY` is set on Vercel
- Answers follow the active language

## Best practices used

### Backend (PHP)
- **Dependency injection** — `AppFactory` composition root wires router, controllers, repository, and config
- **OOP / SOLID** — controllers depend on `PortfolioRepositoryInterface`, not concrete data classes
- **Repository pattern** — `InMemoryPortfolioRepository` implements the contract; easy to swap later
- **PSR-4 autoloading** — `App\` namespace via Composer
- **Strict types** — `declare(strict_types=1)` across PHP entrypoints
- **Final classes** — controllers, router, HTTP helpers sealed against accidental extension
- **Constructor property promotion** — PHP 8.4+ constructor injection
- **Single responsibility** — routing, API responses (`JsonResponse`), SEO, and data access are separated
- **No service locator in controllers** — dependencies are explicit constructor args

### Frontend (React / TypeScript)
- Typed domain models in `src/types`
- Context-based i18n (`LanguageProvider`) instead of scattered strings
- Progressive enhancement for chat (local engine → optional AI)
- Static JSON fallback when the PHP API is unavailable (Vercel)

### General
- Security headers on API responses (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
- CORS limited to safe GET/OPTIONS for the public API
- Content export script keeps Vercel static data in sync with the PHP source of truth

## License

© Dzhemile Ahmed
