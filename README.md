# Northline Facilities Platform

An existing facilities-management platform refined for an Indian integrated FM company: a public marketing site, local client/admin/technician demo workspaces, and an API-ready Express + PostgreSQL/Prisma foundation.

> **Demo boundary:** the website workspaces use fictional data and browser `localStorage`; they are not authenticated against the API, persisted to a server, or suitable for real operational decisions. Demo login/registration validate input, show success feedback, stay on the same page and do not store credentials, registration details or create accounts. Work-order demo changes are intentionally stored locally in this browser.

## Included

- Public marketing pages for an integrated facilities-management provider, a data-driven 22-service directory and individual service detail/SEO pages.
- Indian B2B company context: fictional Coimbatore office/contact, `+91` phone formatting, IST business hours, INR/en-IN dashboard formatting, Coimbatore demo properties, and Indian site copy.
- A single **Home** navbar dropdown links to the distinct **Integrated Facilities Management** and **Smart Facilities Management** homepages. **Dashboard** remains a normal link to `#/client/dashboard`; **Login** is a clearly styled button.
- Client portfolio, work-order, property, dispatch, maintenance, orders/approval, report, invoice, document, message, profile and settings views; operations/admin and field-technician demo views.
- Demo workflow: New → Pending Review → Assigned → Dispatched → In Progress → Completed → Client Approval → Closed, with On Hold, Waiting for Parts and Cancelled paths. The technician completion form requires handover notes and a site-safety confirmation; optional evidence is not uploaded, and only its filename is retained locally.
- Responsive navigation, mobile dashboard drawer, keyboard-visible focus, light/dark/system theme, consent preferences, Arabic/Hebrew RTL support and locale dictionaries (sample dashboard content is not fully translated).
- An actual Google Maps embed for the fictional Peelamedu, Coimbatore demo office, a directions link and accessible non-embedded fallback. It uses a public query-based embed and does not require a hard-coded or configured Maps API key. Replace with verified office details before launch.
- Current social-brand icons for Instagram, Facebook, LinkedIn, WhatsApp, X and YouTube; clearly labelled fictional profile URLs are centralized in `frontend/src/siteConfig.js` and must be replaced before launch.
- PostgreSQL schema for identity/RBAC, clients, properties, services, work orders/history/attachments, client approval, maintenance, INR invoices/payments, messaging, notifications, content, sessions, audit logs and contact requests.
- Express API starter with Argon2 password hashing, server-side PostgreSQL sessions, CSRF, RBAC, Zod validation, rate limiting, Helmet, CORS allowlist, tenant-scoped work-order access and upload-policy seam.

## Stack

- Frontend: semantic HTML, custom CSS, ES modules and Vite.
- API: Node.js 20+, Express 5, Prisma ORM and PostgreSQL.
- Optional service icons: Font Awesome Brands package (brand assets).

## Run the frontend demo

Run these commands from the project root—the directory containing both `package.json` and `package-lock.json`. The distributable source ZIP intentionally excludes `node_modules`; install dependencies before running tests or builds. For a fresh lockfile-based install, use `npm ci --include=dev`; Vite is a declared development dependency and is required by `npm run build`.

```bash
npm ci --include=dev
npm run dev
```

Vite serves the site at `http://localhost:5173`. Use the **Home** dropdown to switch homepage versions and the normal **Dashboard** link to explore client/admin/technician routes. No shared demo credentials are needed. The map and social profile links use replaceable demo URLs.

Run tests and build the project; `npm run preview` serves the production build locally after a successful build:

```bash
npm test
npm run build
npm run preview
```

## Run the API locally

1. Create a PostgreSQL database and a least-privilege application user.
2. Copy `.env.example` to `.env`; set a strong random `SESSION_SECRET`, `DATABASE_URL` and exact `APP_ORIGIN`. Never commit `.env`.
3. Generate the Prisma client, apply the checked-in schema migration and seed fictional data:

```bash
npm install
npm run prisma:generate
npm run db:deploy
npm run db:seed
npm run dev:api
```

The API listens on `http://localhost:4000`; `GET /health` checks liveness. Set `SESSION_SECURE=true` behind HTTPS, and configure trusted proxy hops intentionally. The Vite dev server proxies `/api` to this API. The current browser workspaces remain demo-only and do not call it.

### Database migration note

The migration at `backend/prisma/migrations/20261008120000_initial_india_facilities_schema/` is a **fresh-database initial baseline**; review the SQL before applying it. This starter did not include prior migration history. If you already have a database created from an older schema or `prisma db push`, back it up and create/baseline a migration plan for that database rather than applying this initial migration blindly. For future development schema changes, use `npm run db:migrate -- --name describe_change` and review the generated migration.

## Environment variables

See `.env.example`. API configuration requires `DATABASE_URL`, `SESSION_SECRET` and `APP_ORIGIN`. `SESSION_SECURE`, `SESSION_SAME_SITE`, `TRUST_PROXY`, upload limits/path and SMTP settings configure or reserve server-side integrations. No Maps API key is required for the current public embed. Do not put secrets in frontend code or `VITE_*` variables.

## API, workflow and limitations

See [`docs/API.md`](docs/API.md). API authentication uses server-side sessions, not browser-stored JWTs. Fetch `GET /api/v1/auth/csrf`, then include the token in `X-CSRF-Token` for mutating requests. The work-order API validates the shared status graph, restricts client cancellation to their own new request, allows company-scoped approval only at `CLIENT_APPROVAL`, and requires a technician handover note for completion.

Production work remains: connect the front end to authorized API routes; finish email verification/reset and notification delivery; implement private file upload/storage, malware scanning and retention; configure payment and tax rules; translate all user-facing content; validate the real office/social details; add UI/API/security/accessibility/load tests; and perform legal/privacy/security review. No claim of production readiness is made.

## Theme, RTL and SEO

- Design tokens and components: `frontend/src/styles.css`.
- Theme preference is stored as `northline.theme` (`light`, `dark`, `system`).
- EN/AR/HE dictionaries live in `locales/`; selecting Arabic or Hebrew sets RTL direction. Translate all sample data, portal content and confirm mirrored controls before launch.
- `robots.txt`, `sitemap.xml` and metadata use the reserved `.example` demo origin; replace it with the verified production domain. Public routes accept both direct path URLs and the existing `#/…` links. Static hosting must rewrite route requests to `index.html`; use prerendering or server rendering if full organic indexing of every SPA page is required. Structured data uses `Organization` only—no fictional address or LocalBusiness claim.

## Customization

Replace the demo office, phone, hours, map query and social URLs in `frontend/src/siteConfig.js`. Update fictional property/client fixtures in `frontend/src/demoData.js`. Extend backend models with Prisma migrations and business rules in `backend/src/domain/` and `backend/src/routes/`; frontend visibility is never sufficient authorization by itself.

## License

Starter project source is supplied for evaluation and customization. Confirm third-party, brand, image and commercial-use requirements with your deployment before resale or launch.
