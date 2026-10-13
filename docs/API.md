# API outline

All endpoints are versioned under `/api/v1`. JSON success responses use `{ "success": true, "data": ..., "message": ... }`; errors use `{ "success": false, "message": ..., "errors": [] }`. Paginated list endpoints should return `{ items, page, pageSize, total }`.

## Implemented starter endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/api/v1/auth/csrf` | Issue session-bound CSRF token |
| POST | `/api/v1/auth/register` | Register a client account (email verification integration pending) |
| POST | `/api/v1/auth/login` | Argon2 password verification + server session |
| POST | `/api/v1/auth/logout` | Destroy session |
| GET | `/api/v1/auth/me` | Current account |
| GET / POST | `/api/v1/work-orders` | Tenant-scoped list / create |
| GET / PATCH | `/api/v1/work-orders/:id` | Tenant-aware detail / permitted update |
| POST | `/api/v1/work-orders/:id/comments` | Add a scoped public or manager-only internal comment |
| GET | `/api/v1/services` | Published service directory |
| GET | `/api/v1/properties` | Role-scoped properties |

## Work-order workflow

The shared status vocabulary is `NEW`, `PENDING_REVIEW`, `ASSIGNED`, `DISPATCHED`, `IN_PROGRESS`, `ON_HOLD`, `WAITING_FOR_PARTS`, `COMPLETED`, `CLIENT_APPROVAL`, `CLOSED`, and `CANCELLED`. The allowed transition map is in `backend/src/domain/workOrderWorkflow.js` and is covered by `node --test`.

- Operations moves new requests into review, assigns an active technician, dispatches the job, places work on hold, and submits completed work for client review.
- The assigned technician can start work, pause for a hold/parts issue, and submit completion with a handover note plus an explicit site-safety confirmation. The API requires both when a technician submits `COMPLETED`, and records the confirmation timestamp; upload plumbing and evidence scanning still need to be integrated.
- A client can cancel only their own `NEW` request. A client scoped to the owning company can close a request only from `CLIENT_APPROVAL`; the API records the approver and timestamp.
- `CLOSED` and `CANCELLED` are terminal in the current workflow. Reopen transitions from `COMPLETED` or `CLIENT_APPROVAL` return to field work only through manager-authorized routes.

## Conventions

- Send cookies (`credentials: include`) and the `X-CSRF-Token` header on `POST`, `PATCH`, `PUT` and `DELETE` requests.
- `page` defaults to 1; `pageSize` is capped server-side. Search and filters should be allow-listed per resource.
- Dates are ISO 8601; monetary values are stored as decimal currency amounts with an explicit ISO currency (the demo seed uses INR).
- Never return password hashes, reset tokens, session IDs, internal stack traces or private attachment paths.

Extend the route set using the same validation → authentication → authorization/ownership → service → response pattern. See `backend/src/routes/workOrders.js` for the reference implementation. These endpoints are an API foundation, not a claim of production certification; finish the integrations and independent security/testing work in `README.md` before launch.
