# Verification plan

## Frontend
- Test public navigation and direct hash routes at 320, 375, 768, 1024 and 1440 px.
- Exercise login demo routing, work-order create/status update, table search/filter/sort/pagination, CSV export, newsletter/contact form states, calendar mode, cookie controls, light/dark/system and EN/AR/HE direction.
- Keyboard test navigation, dropdowns, drawer, dialogs, forms and focus return. Run axe or an equivalent automated audit; manually review contrast and screen-reader announcements.

## API
- Add automated tests for registration/login/logout, session invalidation, CSRF rejection, Zod validation, every role boundary, client tenant isolation, pagination limits, status-transition rules and optimistic concurrency.
- Add security tests for IDOR, SQL injection, XSS output, rate limits, upload spoofing and path traversal. Use isolated test database and seeded fixtures.

## Current starter coverage
- No third-party runtime dependencies are loaded by the marketing/demo frontend.
- Demo CRUD and filters are client-side only and are not security boundaries.
- API endpoints and database models are a production-oriented integration foundation, not a substitute for deployment-specific threat modeling, penetration testing, legal review, or end-to-end testing.
