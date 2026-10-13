# Northline FM — implementation report

**Review date:** 13 October 2026 (Asia/Kolkata)  
**Status:** The existing application includes the latest screenshot-driven spacing and card-row repairs, a content-led Contact layout, the supplied responsive type scale with one consistent site font stack, and responsive public/dashboard hamburger controls. Public LTR/RTL, theme and Request service actions move into the public menu at compact widths; workspace quick actions move into the workspace drawer, while desktop layouts are preserved. On phones, Home/Smart preview badges now sit below rather than over their panels, and the Northline FM wordmark stays beside the logo with the hamburger at the opposite edge. The dark-mode login panel is now explicitly centered with a 430px maximum width, and Google/Apple actions auto-fit to one or two columns without changing preview-only sign-in behavior. The dashboard header language selector is removed; workspace language preferences remain in Settings. Earlier dark-mode contrast fixes remain. A Playwright/Chromium audit found no horizontal overflow across 97 routes at 320, 390, 768 and 1024 px; a login-specific check also covered 320–1024px layouts. The Vite SPA, Express/Prisma/PostgreSQL foundation, APIs, routes, both homepage designs, dashboards, workflows and all service-detail pages remain intact. No production deployment was performed.

## What changed

- **Brand:** Created an original Northline FM architectural SVG mark and matching SVG favicon, integrated them into the shared logo, and linked the favicon in the app shell.
- **Copy and layout:** Preserved natural wrapping for short descriptions instead of clipping them. Kept the Home dropdown’s two destinations while removing its introductory label. Services remains a direct link; all 22 service-detail routes remain available. Request a Service remains visible, with progressively shorter labels at smaller widths.
- **Themes and privacy:** Retained distinct light/dark appearances and theme/direction controls; strengthened dark-surface text, control and focus treatments. Automatic privacy-banner rendering is suppressed while the manual preferences dialog remains available.
- **Imagery and Blog:** Reviewed the five new representative facilities photographs and documented their provenance. Added 10 substantive articles, taking the Blog from 14 to 24 distinct articles. Each article has its own local image, meaningful alternative text, section anchors, related links and a service CTA. Search, category filters, pagination, sharing and article reading controls remain wired. The new directory background stays scoped to Blog.
- **Contact and preservation:** Kept Contact content-led, with a tablet two-column details/map layout and single-column mobile layout. The form remains non-transmitting; Google/Apple sign-in remains preview-only. Existing pricing remains ₹9,999 and ₹24,999 monthly, with exact 12-month totals of ₹1,19,988 and ₹2,99,988 and no discount. Dashboard return links and the existing API/database configuration are unchanged.
- **Screenshot-driven layout pass (13 October):** Reduced excessive shared section gutters while retaining deliberate spacing; rebalanced the About story into a photo/copy pair; made Contact stack before its columns become cramped; and widened Services/Blog cards for their 16px copy. Filtering now gives one-result sets a full-width horizontal card, with balanced layouts for other small result counts. Desktop image-card explanations use concise one-line summaries at 16px (not reduced or clipped); original full service/article copy remains on its detail pages, and full industry descriptions remain available in keyboard-operable disclosures. Small screens wrap naturally.
- **Typography:** Applied the supplied scale with public body text at 17px desktop / 16px narrow screens, H1 at 32–48px, H2 at 24–34px, H3 at 24–30px and article copy at 18–20px. Compact labels and functional text remain 12–14px. The existing Inter/UI-sans/system stack is now used consistently for site text, controls and previously contrasting serif accents. Workspace form labels are 14px and entered values 16px; public forms use the same readable control scale.
- **Dark-mode contrast follow-up (13 October):** Added dark-theme-only surfaces and text treatments for the Home trust/client-name strip, primary CTA band and About certification/“Examples” section. Increased client-name visibility and tuned CTA headings, supporting labels, credential list text and check icons; the existing light-theme styles are left untouched.
- **Screenshot whitespace follow-up (13 October):** Expanded orphaned end-of-row Service cards and Blog cards to use available grid width; balanced the final featured-article row on desktop. Changed Contact to a single main column with a two-column supporting-info area below at all viewport widths (one column on narrow screens), so the form and useful Contact content stay in view without a split-column void. Existing content is reused; no unverified business claims or unrelated sections were added.
- **Responsive dashboard toolbar (13 October):** Removed the language selector from all dashboard top bars while retaining language preferences in Settings. Kept the search, theme, notifications and profile controls in the desktop top bar; at widths up to 1160px, they are surfaced in the sidebar opened by the hamburger and their top-bar versions are hidden. Preserved delegated actions, added responsive search-shortcut focus, and synchronized the menu’s accessible expanded/name state and focus return. No route, workflow, API or backend behavior changed.

## Verification actually performed

| Check | Result |
|---|---|
| Dependency install | `npm ci --include=dev` installed 152 packages; 153 packages audited; **0 vulnerabilities** reported. |
| Regression suite | `npm test` — **40 passed, 0 failed**. Covers the public menu controls, mobile preview badges and brand/menu alignment, centered responsive auth panel/provider actions, dashboard toolbar, narrow-screen metric/status chart/scope reflow, dark-mode contrast, sparse/orphan card rows, Contact, typography, pricing, preview-only sign-in and existing workflows. |
| Production build | `npm run build` — **passed** with Vite 6.4.4 (17 modules transformed). |
| Representative dark-palette contrast calculations | Trust secondary text on dark section **8.80:1**; CTA white/accent text on dark band **16.95:1 / 11.39:1**; credential emphasis on dark section **8.32:1**; check-icon foreground on its badge **7.43:1**. These are representative named-color calculations, not a full rendered-state WCAG audit. |
| Syntax/data checks | `node --check` passed for JavaScript under frontend source, backend source, tests and Prisma seed files. Locale JSON files parsed successfully. |
| Server-render/source audit | This screenshot pass re-rendered **63 public routes** (including all 22 service details and 24 articles), checking 269 image elements and 165 in-page anchors. No missing local image, missing meaningful alt, broken in-page target, blank/undefined page output or automatic privacy banner was found; 123 `aria-hidden` logo marks are intentionally decorative. The prior full 97-route audit (63 public, 16 admin, 13 client, 5 technician) remains documented in `QA_REPORT.md`. These are Vite server-render/source checks, not browser rendering. |
| Vite HTTP smoke | The restarted local preview returned **HTTP 200** for the app shell and edited dashboard renderer, main handlers and stylesheet. This checks HTTP delivery only, not rendered interaction. |
| Editorial imagery | Visually inspected all five new 1264 × 848 photographs for topic fit; their alternatives identify depicted people as representative imagery, not Northline staff. Image-generation usage terms should be reviewed before commercial publication. |
| Browser viewport/interaction audit | Headless Playwright/Chromium: **97 routes × 4 widths** (320, 390, 768, 1024px), with zero document overflow, missing main/title or page errors. Screenshots were visually reviewed for the Home client preview, Smart insight panel and phone header (320–382px), plus representative tablet/mobile layouts. Public navigation was exercised at 320, 390, 768, 1024, 1360, 1361 and 1440px; menu visibility, opposite-edge placement, desktop controls, Escape-close/focus return, LTR/RTL persistence, theme toggle and Request service navigation behaved as expected. |
| Cross-browser/full accessibility | No Edge/Firefox/physical-device, screen-reader or automated axe/WCAG audit was run. The tested keyboard checks cover Escape and focus return, not a complete accessibility evaluation. |
| Lint and deployment | No lint script exists. No database migration, production API setup, external map/social test or deployment was performed. |

## Main files

- `frontend/public/assets/brand/northline-fm-mark.svg`, `frontend/public/favicon.svg` — original logo mark and matching favicon.
- `frontend/src/icons.js`, `frontend/index.html`, `frontend/src/styles.css` — shared logo, favicon reference, themes, responsive spacing/type, image-card layouts, navigation, Contact layout and responsive dashboard drawer controls.
- `frontend/src/marketing.js`, `frontend/src/components.js`, `frontend/src/main.js`, `frontend/src/dashboards.js` — public templates, dashboard markup/actions, service card summaries and filtered-result layouts.
- `frontend/src/demoData.js` — 22 service-card summaries and 24 Blog articles with concise listing summaries; full descriptions remain available on detail views.
- `frontend/public/assets/blog/` — five new article photographs: `facilities-mobilisation-planning.jpg`, `hvac-maintenance-routine.jpg`, `energy-efficiency-operations.jpg`, `water-systems-leak-prevention.jpg`, `contractor-work-coordination.jpg`.
- `frontend/test/publicExperience.test.js` — regression coverage for the public experience, typography, spacing, summaries, sparse-filter layouts, responsive dashboard controls, unobstructed phone previews/header alignment and the centered adaptive login panel.
- `ASSET_SOURCES.md` — asset provenance and publication caveats.
- `QA_REPORT.md` — historical notes and the latest QA results.
- `/home/user/northline-fm-updated-source.zip` — refreshed 109-file source archive; integrity checked and excludes `node_modules`/`dist`.

## Vercel steps (not executed)

For a **static frontend preview**:

1. Import the repository and set the project root to the folder containing the root `package.json` and `vite.config.js`.
2. Choose the **Vite** framework preset.
3. Use install command `npm ci --include=dev`, build command `npm run build`, and output directory `dist`.
4. The app currently uses hash routes. If clean-path routes are introduced, add a Vercel rewrite to `/index.html`; Vercel's Vite guide documents this SPA requirement.
5. Deploy a preview first and replace the `.example` origin, company/contact data and other illustrative details only with verified information.

A static Vercel build deploys only the frontend. The existing Express/Prisma API and PostgreSQL database need a separate compatible host or an intentional serverless adaptation; the Vite `/api` proxy is development-only. Keep secrets server-side. No `vercel.json` or production configuration was added.

The current workspace preview on port 5173 is local and is **not** a hosted production deployment. For Vercel references, see [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite) and [Vercel build configuration](https://vercel.com/docs/builds/configure-a-build).

## Public-header and mobile/tablet alignment follow-up (13 October 2026)

This follow-up completes the requested compact public navigation placement and addresses the remaining narrow-width layout defects from the preceding all-route audit. The Vite SPA, Express/Prisma/PostgreSQL foundation, existing routes,  content, client/admin/technician workflows, pricing, themes, API and database were preserved. No production deployment was performed.

### Changes delivered

- Kept public LTR/RTL controls, the theme toggle and Request service action inside the collapsible hamburger menu through the existing **1360px** compact-navigation breakpoint. The desktop `nav-actions` layout remains in place above that breakpoint; the controls continue to use their existing actions and destinations.
- At phones no wider than **359px**, service-detail scope cards use one column so full-size headings wrap naturally rather than forcing horizontal overflow. Metric-card annotations stack at widths up to 390px without shrinking the text.
- Reflowed the admin work-order status chart at widths up to 700px into a labelled list with full status names, counts and comparative bars. This keeps all 11 categories readable without relying on clipped or overlapping axis labels.
- Removed the spotlight image’s tablet minimum-height constraint between 761px and 920px, allowing its existing aspect ratio to fit the two-column grid.
- Avoided global overflow clipping. Relevant card copy, chart statuses/counts, image, scope content and navigation actions remain available.

### Verification performed

| Check | Result |
|---|---|
| `npm test` | **38 passed, 0 failed.** Includes regression coverage for public navigation placement, dashboard quick actions and narrow metric/chart/scope reflow. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| Syntax/data | `node --check` passed for JavaScript under frontend/backend source and tests, plus the Prisma seed; frontend locale JSON parsed successfully. |
| Playwright/Chromium route audit | **97 routes × 4 viewport widths** (320, 390, 768 and 1024px): zero document horizontal overflow, missing main/title or page errors. Includes 22 service details, 24 articles, 16 static public routes, a fallback route, 16 admin, 13 client and 5 technician routes. This measures rendered fit/landmarks/errors, not every visual detail. |
| Public navigation interaction | At 320, 390, 768, 1024 and 1360px, direction, theme and Request service controls appeared in the open hamburger menu while desktop controls were hidden; at 1361 and 1440px the hamburger was hidden and the desktop control row visible. Escape closed the menu and returned focus. LTR/RTL preference changes, the theme toggle and the Request service link to Contact were exercised in Chromium. |
| Representative visual review | Chromium screenshots were reviewed for 320px admin/client metric cards, the admin status list and service-detail scope cards, plus the 768px Services spotlight. The reviewed content wrapped and fit; the full set of 97 routes was measured for overflow but not individually screenshot-reviewed. |
| Remaining accessibility/browser limits | No cross-browser Edge/Firefox or physical-device run, screen-reader assessment or complete axe/WCAG audit was performed. Escape/focus-return checks and the 97-route layout audit do not establish full accessibility conformance. |
| Deployment/backend | No production deployment, database migration, API setup or production configuration was performed. The port-5173 workspace preview remains local-only. |

The refreshed source archive is `/home/user/northline-fm-updated-source.zip`; it excludes generated dependencies/build output and is integrity-checked after final documentation updates.

## Phone preview alignment and compact header follow-up (13 October 2026)

This pass responds to the supplied Home, Smart-home and mobile-header captures. The existing application, both homepage options, preview content, routes, theme/direction actions, and desktop navigation behavior remain intact.

### Changes delivered

- At widths up to **700px**, the Home preview’s “Safety first” and “Urgent response” badges now align below the client-workspace panel rather than obscuring its title or work-order row.
- The Smart insight panel’s “Connected assets” and “Less reactive work” badges now follow the analytics panel instead of covering its heading/chart/alert. At phone widths, its brand/period header stacks; the stat grid becomes two columns with the final metric on its own row below 400px. The tiny Home chart labels wrap into a spaced 3×2 layout below 360px.
- At widths up to **400px**, the existing “northline FM” wordmark is visible beside the brand mark. Through the compact-navigation breakpoint, the hamburger is aligned to the opposite edge of the header; above 1360px, desktop navigation remains unchanged.
- The floating badges, chart labels,  analytics and preview workflow remain present; no global clipping or font-size reduction was used to solve the collisions.

### Verification performed

| Check | Result |
|---|---|
| `npm test` | **39 passed, 0 failed.** Includes a new regression test for preview-badge placement and phone header alignment. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| JavaScript/locale syntax | `node --check` passed for frontend/backend source and tests and the Prisma seed; locale JSON parsed successfully. |
| Playwright/Chromium route audit | **97 routes × 4 widths** (320, 390, 768 and 1024px): zero document horizontal overflow, missing main/title or page errors. |
| Screenshot review | Rechecked the Home client preview at 320/372px, Smart panel at 320/351px, and the header at 320/382px. Preview callouts no longer overlap the underlying content; the brand text and hamburger occupy opposite ends. |
| Header interactions | At 320, 390, 768, 1024 and 1360px, the hamburger/menu controls appeared and the button aligned opposite the brand; at 1361/1440px the desktop control row remained visible. Escape closed the menu and returned focus; LTR/RTL, theme and Request service-to-Contact actions were exercised. No browser page errors occurred. |
| Limits and deployment | No Edge/Firefox, physical-device, screen-reader or full axe/WCAG audit was performed. No API/database changes, migrations or deployment were made; port 5173 remains a local preview. |

The refreshed source ZIP is `/home/user/northline-fm-updated-source.zip` (109 files); ZIP integrity is checked, and `node_modules`/`dist` are excluded.

## Dark-mode login alignment follow-up (13 October 2026)

This focused fix responds to the supplied login screenshot. It preserves the existing form copy, route, form markup and preview-only sign-in disclosures; no backend, API, credential handling or account flow was changed.

### Changes delivered

- Set the login panel to a responsive **430px maximum width**, explicitly centered within its auth column, with the form held to the same full width.
- Made Google/Apple action columns auto-fit to the panel: they remain side by side when each can hold its minimum width and become one full-width row when the form is narrower. Narrow phone buttons keep their icon/label aligned to the same start edge. No text-size reduction was used.
- Kept the existing dark palette, Google/Apple preview-only disclosure and non-transmitting sign-in behavior intact.

### Verification performed

| Check | Result |
|---|---|
| `npm ci --include=dev` | Passed; 152 packages installed, 153 audited, **0 vulnerabilities** reported. |
| `npm test` | **40 passed, 0 failed**, including the new auth alignment regression. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| Playwright/Chromium login viewport check | Visually reviewed a dark-mode screenshot at **546 × 668 CSS px** (1.25 device scale factor, matching the supplied 682 × 835 capture dimensions). The card center matched the viewport center; no horizontal overflow occurred. Widths 320, 390, 546, 682, 768 and 1024px were measured. Provider actions used two columns when the card was wide enough and one column at narrower card widths; document width equalled viewport width throughout. |
| Preview-only behavior | Submitting  credentials stayed on `#/login` with **zero `/api` requests**; clicking Google kept the sign-in disclosure visible and also made zero API requests. No browser page errors occurred. |
| Remaining limits | No full screen-reader/axe/WCAG audit, physical-device run, backend integration or deployment was performed. The Vite preview remains local-only. |

The latest source ZIP is `/home/user/northline-fm-updated-source.zip`; the archive is integrity-checked and excludes `node_modules` and generated `dist`.
