# Deployment notes

## Frontend
Run `npm run build`, then publish `dist/` to a static host/CDN. Keep the existing `#/…` links and configure SPA fallback/rewrite to `index.html` so direct public path URLs also render. Replace the reserved `.example` canonical host, sitemap and robots URLs. Structured data intentionally avoids a LocalBusiness/address claim for this fictional demo. Add route-level prerendering or server rendering if organic SEO is required for every marketing page.

## API
Deploy the Node API to a managed container/runtime with TLS and a managed PostgreSQL service. Run Prisma migrations as a reviewed release step. Store `DATABASE_URL` and `SESSION_SECRET` in a secret manager. Set `APP_ORIGIN` to the exact browser origin, `SESSION_SECURE=true`, and `TRUST_PROXY` to the known edge proxy count. Configure graceful shutdown and health/readiness probes.

## Before production
Add structured redacted logging, monitoring, CSRF and authorization integration tests, upload signature inspection and malware scanning, durable mail/notification queue, privacy/retention workflows, a real password reset and verification service, rate-limit storage suitable for multiple instances, automated backups and restore drills. Validate CSP, CORS, cookie behavior and all client-ownership checks from a separate tenant account. The sample does not certify regulatory compliance or a security audit.
