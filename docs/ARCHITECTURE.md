# Architecture

## Runtime boundaries

- `frontend/` is a dependency-light Vite application. Its demo workspace persists data to browser `localStorage` and is deliberately labeled as a demo. It is useful for evaluating navigation, responsive layouts, work-order flows, filtering, status updates, exports and theme/locale preferences without a database.
- `backend/` is an Express REST API with Prisma/PostgreSQL models. The API is independent from the demo data adapter. Configure the database and session secrets before using it; do not treat browser demo data as a secure source of truth.
- `locales/` contains English, Arabic and Hebrew string dictionaries. Arabic and Hebrew select RTL document direction; production content should be fully translated and reviewed by native speakers.

## Main flows

1. A client submits a validated work order.
2. Server-side authentication and RBAC middleware check the actor's role; client ownership is checked on property and work-order access.
3. A manager assigns the work order. Each status change appends a history event and an audit record in the same transaction.
4. Notification delivery is an integration seam: persist the notification first, then deliver email through a configured provider/queue.

## Security notes

- Authentication is backed by server-side sessions stored in PostgreSQL, with HttpOnly, SameSite cookies. Enable secure cookies behind HTTPS and set `TRUST_PROXY` carefully.
- Mutating browser requests require the CSRF token supplied by `/api/v1/auth/csrf`. Keep frontend and API on the same site in production.
- `requireRole` is not a substitute for ownership filtering. Client-scoped queries must always include the authenticated account/company ID.
- Upload policy is allow-list based and currently demonstrates size, extension and MIME validation. For production, add signature inspection (for example, `file-type`), malware scanning, private object storage, signed download URLs and retention controls.

## Scaling seams

Keep route handlers thin. Business rules belong in `services/`; validation belongs in `validators/`; Prisma schema changes go through migrations. Add background jobs for mail, scheduled maintenance, reports and recurring invoices rather than blocking HTTP requests. Use a managed secret store, structured logs with request IDs, database backups, monitoring and an incident response plan in deployment.
