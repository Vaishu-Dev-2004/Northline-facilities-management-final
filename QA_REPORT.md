# Northline FM — QA report and review history

**Latest review:** 13 October 2026 (Asia/Kolkata)  
**Scope:** Ongoing UI/content follow-up on the existing Vite frontend and Express/Prisma/PostgreSQL foundation; the application architecture is preserved. This file retains earlier dated reviews for context. The latest results and route/blog counts are recorded in the final section and supersede older counts; the newest dark-mode login alignment check is recorded after the phone-header follow-up. No deployment is claimed.

## Dependency/build follow-up (8 October 2026)

- `package.json` and lockfile v3 are synchronized; every external package import is declared and has a lockfile entry. `zod` is a runtime dependency (`^3.25.67`, locked `3.25.76`); Vite is a development dependency (`^6.3.5`, locked `6.4.4`). `express`, Prisma CLI and `@prisma/client` are declared and locked. `@vitejs/plugin-react` is not imported by the project and is not required.
- **No dependency versions or application code were changed.** The initial reported errors were not reproducible from a clean root install. They are consistent with running commands before installing dependencies from the project root, using an incomplete `node_modules`, or omitting dev dependencies (the latter explains missing Vite, but not a missing runtime `zod`). The extracted ZIP intentionally has no `node_modules`; install first from the directory containing the root manifests. The exact cause in the original failing environment cannot be proven from this workspace.
- From a clean dependency state, `npm ci --include=dev` installed 152 packages (153 audited) with 0 vulnerabilities; the requested `npm install` then completed up to date. The lockfile and manifest hashes were unchanged.
- After that install, `npm test` passed **19/19** and `npm run build` succeeded. `npm ls --depth=0` resolved all 14 declared direct packages, including Zod and Vite.
- The dependency follow-up changed documentation only: `README.md` now explicitly says to run commands at the project root, install after extracting the ZIP, and retain dev dependencies for builds. The source ZIP contains no `node_modules` or `dist`.

## UI/UX refinement (8 October 2026)

- Improved the reading scale and contrast across public pages, contact forms and key dashboard labels. Reduced the public disclosure/header height, added a compact primary-nav collapse for narrower laptops/tablets, and retained mobile menu controls.
- Replaced the public Language selector with keyboard-operable LTR/RTL buttons. The selected direction is persisted separately from locale; Arabic/Hebrew still default to RTL when no explicit direction is stored. Language selection remains available in dashboard preferences.
- Added one public Blog item and one Pricing item (both existing routes); updated the English nav labels to Blog, Login and Dashboard. The client workspace landing label is Dashboard.
- Removed direct client/admin dashboard shortcuts from login. Added branded Google/Apple buttons that only explain that sign-in is not connected; they send no credentials and do not redirect. Existing local login/register behavior was otherwise left intact.
- Added a shared Back to Website link to client, admin and technician sidebars. Refined Contact copy and spacing; it makes clear that the form checks details locally and does not send an enquiry. Company/contact/map/social values remain configurable; no real business details were invented.
- Added two compressed, locally served FM photographs for the service, industry and article sections. New photos use descriptive alt text, responsive object-fit crops and lazy loading where appropriate. Existing hero and map assets remain in place.
- Updated initial document/SEO titles and route titles to describe the page content. No framework, dependencies, backend/API, database, security model or dashboard workflows were changed.

### UI verification

| Check | Result |
|---|---|
| `npm ci --include=dev` | Passed; 152 packages installed, 153 audited, **0 vulnerabilities**. |
| JavaScript syntax | Passed for frontend/backend source and test `.js` files; locale JSON parsed successfully. |
| `npm test` | **19 passed, 0 failed.** |
| `npm run build` | Passed with Vite 6.4.4; all three local FM images were emitted to `dist/assets`. |
| SSR/static route audit | **84 routes rendered** (50 public, 16 admin, 13 client, 5 technician). Main landmarks, internal links, image alt text, iframe titles and safe new-tab links passed. Blog/Pricing appear once in the public nav; login has no dashboard shortcuts; all workspaces have Back to Website links. |
| Direction/auth/contact checks | LTR/RTL preference persistence and Arabic/Hebrew defaults passed. Contact text contains no demo/fictitious warning; local-only form behavior is stated. Google/Apple buttons are UI-only and make no authentication request. |
| Responsive/accessibility source checks | Checked the 320px minimum, laptop/tablet/mobile breakpoints, RTL rules, reduced-motion and focus-visible styles, and responsive photo sizing. **No real-browser, device-width visual, screen-reader, axe/WCAG contrast or interaction automation was available/run.** |

## Outcome

The reviewed build is clean on the checks listed below. Earlier fixture and UI inconsistencies were corrected, client CSV export filtering is covered by tests, and all 84  public and workspace routes render through the existing page renderers. This is still a **fictional, browser-local demo**, not a live FM service or production-ready authenticated application.

## Issues fixed

- Replaced misleading fixed dashboard totals with counts derived from the relevant  records and clarified active, completed, upcoming, and illustrative values across client, admin, and technician workspaces.
- Scoped client CSV exports to Meridian Workspaces' work orders, invoices, properties, and property-linked schedules; unsupported client export collections return no records. Added regression tests. Replaced a cross-client work-order reference in the client Documents examples.
- Clarified that replies, contact, newsletter, sign-in, registration, downloads, file evidence and workspace changes are demo-only. Login and registration validate and show success without app-level credential/account persistence, API transmission or redirect; the backend auth foundation remains separate.
- Removed unsupported public history and universal support promises. Replaced the fabricated homepage performance, scale, tenure and 24/7 figures with catalog/ context; clearly labelled illustrative case-study results, bylines and plan content.
- Centralized replaceable India-market contact/map/social details in `frontend/src/siteConfig.js`; preserved the interactive query-based Google Maps embed, directions and visible fallback link. Social links remain six configurable, labelled fictional demo profiles, including X.
- Improved form error associations and the authentication confirmation error state; added dialog initial focus, focus containment and focus restoration; replaced placeholder pagination controls with generated, named pagination navigation.
- Updated privacy-choice messaging to accurately state that optional analytics/marketing trackers are not installed in this demo.

## Verification performed

| Check | Result |
|---|---|
| `npm install` | Up to date; 153 packages audited; **0 vulnerabilities** reported. |
| JavaScript syntax (`node --check`) | Passed for `.js` files in `frontend/src`, `frontend/test`, `backend/src`, and `backend/test`. |
| `npm test` | **19 passed, 0 failed.** Covers backend workflow rules, local demo transitions, client export scope, and site configuration/social/map requirements. |
| `npm run build` | Passed; Vite 6.4.4 transformed 17 modules and emitted the production bundle. |
| Prisma schema | `prisma validate` passed using a placeholder local PostgreSQL URL; `npm run prisma:generate` generated Prisma Client 6.19.3. **No database connection or migration was run.** |
| SSR route/markup audit | **84 routes rendered:** 50 public, 16 admin, 13 client and 5 technician. Static checks found no missing/duplicate page landmarks, unnamed buttons/controls/dialogs, missing image alt or iframe titles, empty/dead internal links, unsafe new-tab links, or cross-client records in the checked client lists. |
| Acceptance spot checks | 22 service records; visible `#/client/dashboard` action; six social links; configured map embed/fallback; client export scope tests; no residual homepage 24/7, 500+, 15+, 98.4% performance claims. |

## Coverage and limitations

- **Dashboards/work orders:** Rendered all listed role routes; workflow unit tests cover review, assignment, dispatch, in-progress, completion safety/handover, client approval and terminal states. UI actions were code-reviewed, not exercised in a real browser.
- **Auth/forms:** Source review confirms the demo login/register path uses browser validation, resets fields, gives feedback and stays on the auth route without calling `apiRequest` or storing form values. Contact/newsletter success states are also local-only. These interactions were not browser-automated.
- **Maps/social:** Configuration, labels, URLs and fallback markup were checked. External Google Maps/social destinations were not network-tested; the profiles/office/contact are fictional and must be replaced with verified details.
- **SEO:** The SPA metadata logic sets `noindex,nofollow` for admin, client, technician and auth routes; public metadata, canonical/schema, robots and sitemap remain on the reserved `.example` demo origin. The SPA is not prerendered; configure the production origin and hosting fallback before launch.
- **Accessibility/responsiveness/themes/RTL:** Static markup and CSS checks passed for labels, focus-visible styling, modal keyboard focus handling, reduced-motion support, 320px minimum layout, responsive breakpoints, theme controls and RTL direction/logical layout rules. **No real browser, screen-reader, axe/WCAG contrast or visual checks at device widths were run.** Arabic/Hebrew dictionaries do not translate all  portal content.
- **Security/integrations:** Express/Prisma/session/CSRF/RBAC/tenant-scoping foundations were retained. The browser dashboards remain localStorage demo data and are not an authorization boundary. The 19-test suite does not include live auth/session/CSRF/IDOR integration tests; no PostgreSQL, mail, payment or file-storage integration was exercised. Security review, threat modelling and penetration testing remain deployment work.
- **Legal/business readiness:** Company/contact/social details are placeholders, public case figures and testimonials are fictional, and the privacy/terms copy is template material. Replace and review these with verified business/legal details before launch.

## Main files changed

- `frontend/src/dashboards.js` — sample-aware dashboard metrics, role views, messages/calendar/document copy and pagination/navigation details.
- `frontend/src/main.js` — client-scoped exports, contact/auth feedback, direction controls, privacy-choice text and accessible dialog behavior.
- `frontend/src/marketing.js` — descriptive route titles, contact copy, login provider UI, photography placements and public page content.
- `frontend/src/components.js` — public navigation, direction controls, social/disclosure and privacy-choice presentation.
- `frontend/src/demoData.js` and `frontend/src/siteConfig.js` — corrected sample content and India/demo configuration.
- `frontend/src/exportScope.js` — new reusable client export-scope helper.
- `frontend/test/exportScope.test.js` and `frontend/test/siteConfig.test.js` — new regression/configuration tests.
- `frontend/src/styles.css` and `frontend/index.html` — readability, spacing, navigation, responsive layout, imagery and neutral initial metadata.
- `frontend/src/i18n.js`, `frontend/src/icons.js`, `locales/*.json` — persisted direction selection, Google/Apple marks and localized navigation labels.
- `frontend/public/assets/fm-plant-room.jpg` and `frontend/public/assets/fm-workplace-operations.jpg` — optimized local facilities-management photography.

## Before production

Replace `.example` contact/domain/social data; verify the office and service region; connect client/admin/technician UI to authorized APIs; run PostgreSQL migrations only after database-specific review; implement monitored contact, email/reset, notification, uploads and payment integrations; complete legal/privacy review, full translation, real-browser responsive and accessibility testing, and security integration testing.

## Follow-up surgical UI/UX refinement (9 October 2026)

This addendum records the latest requested pass. It modifies the existing Vite application in place; no framework, architecture, backend, database, API, authentication model, dashboard workflow or route was replaced.

### Changes delivered

- **Public navbar (updated in the final pass below):** A single **Home** trigger now opens the Integrated Facilities Management and Smart Facilities Management routes; the main navbar does not show “Home 1” or “Home 2”. Services, About, Industries, Blog, Pricing, Contact, Dashboard, Login, LTR/RTL, Theme and Request a Service remain available. Dashboard is a normal link to `#/client/dashboard`; Login is an outlined button-style link to `#/login`. The mobile menu retains the existing routes and controls.
- **Contact:** Removed the extra section-bottom padding and reduced the Contact-specific footer lead-in. The page remains content-height driven; the form, office details, map, fallback/directions and social links remain present. The form remains local-only and does not transmit an enquiry.
- **Services/industries:** Added individual image/alt metadata for all 22 services and all 12 industry options. Service, industry and detail imagery uses local files, fixed responsive aspect ratios, `object-fit: cover`, explicit image dimensions and lazy loading where appropriate. No file is repeated within its service group or within its industry group. Two pre-existing invalid related-service slugs were corrected to the existing `facility-maintenance` route.
- **Blog:** Reworked all 11 entries with unique categories, titles, excerpts, SEO descriptions, images, introductions, three subject-specific body sections, key insights, conclusions, tags, CTAs and topic-relevant related links. Listing filters are generated from the article categories, and the featured post is part of the same filterable list rather than duplicated. Detail-page titles, body copy, photo and CTA are specific to the selected article.
- **Homepage versions:** Kept `/` and `/home` as the primary **Integrated Facilities Management** homepage and `/smart` as **Smart Facilities Management**. Added reciprocal hero links and a footer link so both existing versions are straightforward to reach.
- **Typography/contrast/responsiveness:** Raised the public reading scale and dashboard labels/table copy, strengthened muted-text contrast, and tuned service, industry, blog and Contact layouts at the existing desktop/tablet/mobile breakpoints. Added focus-visible treatment for the new navigation and card links. Dashboard tables retain their existing contained scroll behavior.
- **Image provenance:** Added `ASSET_SOURCES.md`. Ten new, tailored FM service photographs were generated; because the image tool reached its per-turn limit, the other images use existing project photos and distinct Pexels search selections. All page references remain local; the Pexels source pages are recorded for launch review.

### Files changed

- `frontend/src/components.js` — navbar links/order, service image-card markup and Smart FM footer link.
- `frontend/src/demoData.js` — image metadata for 22 services; 11 complete article records; relevant related-post links; corrected related-service slugs.
- `frontend/src/marketing.js` — image-bearing industry records/cards, homepage version links, per-service detail photography, filterable blog cards and unique article rendering, Contact wrapper class and per-article metadata.
- `frontend/src/main.js` — article structured-data image and accessible `aria-pressed` state for blog filters.
- `frontend/src/styles.css` — responsive image/card styles, typography/contrast refinements, navbar button treatment and Contact spacing.
- `frontend/public/assets/services/` and `frontend/public/assets/industries/` — local image assets.
- `ASSET_SOURCES.md` — image provenance note.
- `QA_REPORT.md` and `northline-fm-updated-source.zip` — updated report and source archive.

### Verification for this pass

| Check | Result |
|---|---|
| `npm ci` | Passed; 152 packages installed, 153 audited, **0 vulnerabilities**. |
| `npm test` | Passed: **19 tests, 19 passed, 0 failed**. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| SSR route smoke test | **84 routes rendered:** 50 public, 16 admin, 13 client and 5 technician. No empty page/title or `undefined` render detected. |
| Image/content audit | 22/22 service images unique and present; 12/12 industry-card images unique; 11/11 blog images, categories and article pages unique. Checked 110 rendered public `<img>` tags; **0 missing local files or empty alternatives**. |
| Navigation/links | Requested navbar order and link types passed static markup checks. An SSR scan found **81 unique internal route targets and 0 broken targets** across public and workspace pages; all service cross-links, article CTAs and related-post links resolved. Public LTR/RTL and theme controls, plus workspace theme controls, remain rendered. Both homepage versions render different content and cross-link. |
| Contact/auth/workspaces | Map iframe, map fallback and social links remain in Contact; Contact has no form `action`/`method` endpoint. Login/register pages rendered. All **34** admin/client/technician workspace routes retain a Back to Website link. Existing workflow tests passed. |
| Responsive review | Confirmed the stylesheet includes the maintained laptop/tablet/mobile breakpoints and dedicated photo, navigation and Contact rules down to the existing 320px layout minimum. **No real-browser/device screenshot, visual overflow test, screen-reader, axe/WCAG contrast or interaction automation was run.** |

### Remaining checks before production

- A real-browser pass at representative laptop, tablet and phone widths is still needed to verify visual wrapping/overflow and keyboard interaction; static route/CSS audits are not a substitute.
- Existing external map/social destinations were preserved and markup-checked, not network-tested. Confirm company, contact, map and profile details before publication.
- Review original image terms and selections in `ASSET_SOURCES.md` before commercial launch. The project remains illustrative demo content, not a verified Northline service or a live authenticated operations platform.

## Final requested navbar, photography and typography pass (9 October 2026)

This pass preserves the existing Vite SPA, routes, Express/Prisma/PostgreSQL foundation, demo workflows, local-only Contact behavior, auth/demo disclosure, dashboard return links, theme/direction controls and existing service/industry/blog work.

### Changes delivered

- Added exactly one **Home** navbar trigger. It opens accessible links to **Integrated Facilities Management** (`#/`) and **Smart Facilities Management** (`#/smart`); it does not display “Home 1” or “Home 2”. Pointer hover, click/touch, keyboard focus/activation and Escape dismissal are wired without changing route structure. Dashboard remains a normal link and Login remains button-styled.
- Added distinct, local facilities/workplace photography to About sections, with meaningful alt text and captions. Applied restrained, page-specific local backgrounds with readable light/dark overlays across Home, About, Services, Industries, Blog/article, Pricing, Contact, auth, maintenance/not-found and workspace/dashboard areas.
- Raised default body and paragraph text to 18px, used responsive heading sizes (H1 32–48px, H2 24–30px, H3 18–22px), and kept controls/labels appropriately sized. Static CSS and inline-SVG audits found no explicit visible text-size declaration below 12px.
- Removed the strip above the navbar. Kept the truthful illustrative-content disclosure in the footer, and kept Contact, auth and demo-only disclosures accurate.
- Tightened Contact intro/section/footer spacing while retaining the map, fallback/directions, social links and non-transmitting form. Rechecked responsive breakpoint rules and existing Services, Industries, Blog and homepage content/links.

### Verification for this pass

| Check | Result |
|---|---|
| `npm ci --include=dev` | Passed; 152 packages installed, 153 audited, **0 vulnerabilities**. |
| JavaScript syntax + locale data | `node --check` passed for frontend/backend source and test JavaScript; all 3 locale JSON files parsed. |
| Typography source audit | Body/public paragraphs and workspace paragraphs declare 18px; responsive heading scale is present; CSS declarations and inline SVG labels below 12px: **0 found**. |
| `npm test` | **19 passed, 0 failed**. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| SSR/static route and link audit | **84 routes rendered** (50 public, 16 admin, 13 client, 5 technician), with no empty title/content or `undefined` output. Home trigger count: 1; both target links and active states rendered; no “Home 1/2” labels. **81 unique internal route targets; 0 broken targets.** |
| Images/backgrounds | Six distinct About images have alt text and local files. All 12 CSS background-image paths exist; 22 service images, 12 industry images and 11 blog-card records remain distinct within their groups. |
| Contact/disclosure | The above-navbar strip is absent; footer disclosure remains. Contact map/fallback remains, and the form still reports local validation without sending an enquiry. |
| Browser/device visual review | **Not run.** No real-browser screenshot, touch/keyboard interaction automation, device-width overflow test, screen-reader or axe/WCAG contrast audit was available. CSS/source audits are not equivalent to visual or assistive-technology verification. |

The latest production build and `npm test` passed, but the browser/device checks above remain outstanding. The source ZIP excludes `node_modules` and generated `dist`; image licensing/source notes remain in `ASSET_SOURCES.md` for review before publication.

## Requested copy, imagery, pricing, Contact and theme follow-up (9 October 2026)

This final requested pass preserves the existing Vite SPA, routes, Express/Prisma/PostgreSQL foundation, APIs, dashboards, local workflows, security boundaries and existing visual system. No backend, database or authentication architecture was changed.

### Changes delivered

- **Homepage hero:** Removed the entire Scope-led / coverage card and its now-unused CSS rules from the homepage hero.
- **Visitor-facing wording and disclosures:** Removed the requested term from public website copy, accessible labels and visible UI labels. Reworded remaining content as sample, illustrative or preview material where appropriate. Login, registration, recovery, local workspace data, Contact and file-preview disclosures remain truthful: no credentials/accounts are saved, no enquiry or reset email is sent, and representative content is not live client information.
- **About team cards:** Added five optimized synthetic, representative JPEG portraits to the existing five fictional staff cards. Each image has a descriptive alternative identifying it as illustrative and not an actual staff photo; lazy loading and responsive object-fit remain enabled. Their synthetic provenance is recorded in `ASSET_SOURCES.md`. All five cards are retained in the mobile grid.
- **Pricing:** The existing selector now updates both visible prices and `/month` or `/year` labels, button `aria-pressed` values and a polite status announcement. Basic is **₹9,999/month** or **₹1,19,988/year**; Professional is **₹24,999/month** or **₹2,99,988/year**; Enterprise remains **Custom pricing**. Annual rates are exactly 12 monthly payments, with no invented discount.
- **Contact layout:** Rebalanced the desktop form/sidebar columns and changed the tablet layout to place the form above a two-column contact-details/map area at widths up to 1024px; mobile uses a single-column flow. Added minimum-width safeguards and retained the form, contact details, map, fallback/directions, social links and responsive styles. The form remains non-transmitting.
- **Theme:** The navbar toggle now switches directly between resolved light and dark appearance; the separate System choice remains available in settings. Stronger dark surface, text, form, pricing and control colors make the palettes distinctly different, with updated accessible toggle labels and title.
- **Preservation:** Existing application routes, backend/API, database, theme/direction settings, Dashboard return links, form handling and unrelated content/workflows were left intact.

### Verification for this pass

| Check | Result |
|---|---|
| `npm ci --include=dev` | Passed; 152 packages installed, 153 audited, **0 vulnerabilities**. |
| `npm test` | **19 passed, 0 failed.** |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| SSR route/content smoke audit | **84 routes rendered** (50 public, 16 admin, 13 client, 5 technician). Each had page content/title and no `undefined` output. Public rendered content had no forbidden wording; acceptance checks confirmed the hero card is absent, all five representative portrait paths/alternatives render, all three pricing tiers and exact annual values render, and Contact retains its form/details/map. |
| Portrait build assets | All five team JPEGs exist in `frontend/public/assets/team/` and were copied into `dist/assets/team/`. |
| Dev preview HTTP smoke | Vite served the app shell and a team portrait over HTTP 200; the live preview remains running. |
| Responsive/theme source check | Confirmed Contact’s 1024px tablet stack and 700px single-column mobile rules, min-width protections, explicit dark theme tokens and unchanged System/direction controls. The billing handler updates amount, unit, accessible state and announcement. |
| Browser/device review | **Not run.** No real-browser visual screenshot, device-width overflow run, screen-reader, axe/WCAG or interaction automation was available. SSR/CSS-source checks do not replace those reviews. |

The complete source archive is `/home/user/northline-fm-updated-source.zip`; it excludes `node_modules` and generated `dist`. No database connection/migration or external map/social network test was run. The five team portraits are representative synthetic imagery, not actual staff photographs.

## Requested navigation, Blog, privacy, responsive and contrast follow-up (12 October 2026)

This follow-up preserves the existing Vite application, route table, Express/Prisma/PostgreSQL foundation, API, dashboards, sample workflows, preview-only provider buttons, non-transmitting Contact form, theme/direction controls, and repository/deployment configuration. No deployment is claimed.

### Changes delivered

- **Logo:** No supplied brand-mark file was available. The logo uses its existing inline SVG fallback, emits no image URL while the asset is pending, and exposes an explicit pending state for later replacement.
- **Navigation:** Removed the introductory choice copy from the Home dropdown while retaining both homepage destinations. Services is a direct navigation link; service content and detail routes remain present. Kept Request a Service available with full, compact and tiny responsive labels. The wordmark/tagline and control spacing collapse at narrow widths, including a CSS layout path down to the existing 320px minimum.
- **Privacy:** Removed automatic cookie/privacy banner rendering. Footer and policy-page actions still open the manual preferences dialog; unrelated modal behavior remains.
- **Page copy and contact:** Shortened Services, Industries, Blog, Pricing and Contact introductions. The Contact grid now uses content-led rows and a tablet two-column details/map arrangement before collapsing to one column, reducing the former tall empty area.
- **Blog:** Added three substantial, distinct articles (BL-111, BL-110, BL-109), bringing the directory to **14**. The featured post stays first and other cards sort newest-first. Search, category filters, pagination, article table of contents, share controls, related links and service CTAs remain in the existing implementation. The new 1376 × 768 generated illustrative image is scoped to Blog directory backgrounds in light and dark themes; its provenance is recorded in `ASSET_SOURCES.md`.
- **Light/dark contrast and focus:** Strengthened muted text tokens, dark navbar/surface distinction, dark control/form styles and focus treatment. Added readability overrides for compact preview labels, cards, the Smart page, service-detail content, and Industry cards. Dark primary/light buttons use a two-tone focus indicator; selected filters and direction controls use a visible dark-mode focus color.

### Verification performed

| Check | Result |
|---|---|
| Dependency install | `npm ci --include=dev` passed: 152 packages installed, 153 audited, **0 vulnerabilities**. The first test attempt before installation could not resolve `zod`; after the clean install, the full suite ran successfully. |
| JavaScript syntax | `node --check` passed for the five edited frontend source modules and `frontend/test/publicExperience.test.js`. |
| `npm test` | **25 passed, 0 failed.** Includes Blog uniqueness/content/related links/CTA targets/section anchors, preserved search/filter/pagination/article controls, navigation behavior, manual privacy settings and image references. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| Vite HTTP smoke | App shell and the new Blog background asset both returned HTTP 200. |
| SSR route/link/image audit | **87 routes rendered** (53 public, 16 admin, 13 client, 5 technician), with no blank/undefined page output, no broken internal targets and no automatic privacy banner markup. Across **126** rendered image elements: 0 missing local files and 0 missing/empty alt attributes. All 13 unique CSS asset paths exist locally. This is a server-render/source audit, not a browser test. |
| Blog data | 14 articles; unique IDs, slugs, images and section IDs; all checked article bodies exceed 300 words; related-article links and service CTA routes resolve. |
| Representative contrast calculations | Static calculations on named palette pairs: light body text on paper **13.43:1**, light muted text on paper **5.92:1**, light secondary muted on paper **4.96:1**; dark body text on paper **15.94:1**, dark secondary text on a card **10.06:1**, dark muted text on a card **8.29:1**; focus color on light/dark paper **4.04:1 / 4.12:1**; light/dark primary-button text **12.22:1 / 9.61:1**. These are representative source-token calculations, not a complete automated WCAG audit of every rendered component/state. |
| Browser/device/accessibility review | **Not run.** No Chrome/Edge executable or browser automation was available in the workspace. There is no screenshot-based visual inspection, physical viewport-overflow test, screen-reader test or axe/WCAG automation. Responsive behavior and focus/contrast were checked in source and representative color calculations only. |

`ASSET_SOURCES.md` records the new Blog background as generated representative imagery, not a Northline employee photograph. The refreshed source archive is `/home/user/northline-fm-updated-source.zip`; it includes these changes and excludes `node_modules` and generated `dist`. No backend, database, API, dependencies, deployment configuration or production credentials were changed. No database migration, external map/social network test, or deployment was performed.

## Final editorial assets, typography, contrast and preservation regression pass (12 October 2026)

This final follow-up wires and documents the three newly generated Blog images, tightens descriptive-copy sizing so all public paragraphs are not forced to an oversized global value, and extends dark-theme helper/error/pricing colors. It preserves the existing site, API, database, dashboards, routing and working interactions. The three generated images were visually checked for topic fit and representative-people labeling; this was not a browser-page visual review.

### Final verification

| Check | Result |
|---|---|
| `npm test` | **29 passed, 0 failed.** Added regression checks for the three distinct representative Blog images, supplied pricing and exact annual arithmetic, non-transmitting Contact and preview-only provider sign-in, retained dashboard/theme/direction controls, and Contact responsive CSS. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. All three Blog images were emitted under `dist/assets/blog/`. |
| JavaScript/locale syntax | `node --check` passed for frontend/backend source and test JavaScript; all three locale JSON files parsed. |
| SSR/source link-image-route audit | **87 routes** (53 public, 16 admin, 13 client, 5 technician), **2,948 links**, **126 images**, and **13 unique CSS image paths**. No broken audited route or in-page target, missing local image, missing/empty image alt, unsafe new-tab link, blank/undefined page output, missing CSS asset, or automatically injected privacy-banner markup was found. These results are static/server-rendered—not browser rendering. |
| Vite HTTP smoke | The existing workspace server on port 5173 returned HTTP 200 for the app shell, edited source modules and all three new local Blog images. No duplicate server was started because that port was already in use by the workspace preview. |
| Representative contrast pairs | Light body/paper **13.43:1**, light secondary/paper **7.63:1**, light muted/paper **5.92:1**; dark body/paper **15.94:1**, dark secondary/card **10.06:1**, dark muted/card **8.52:1**, dark link/card **9.86:1**, dark validation/card **7.93:1**; focus ring/light paper **4.04:1**, focus ring/dark paper **10.39:1**; primary-button text light/dark **12.22:1 / 9.61:1**. This is a representative named-pair calculation, not a complete component/state WCAG audit. |
| Lint | No lint script exists in `package.json`; no lint result is claimed. |
| Browser/device/accessibility | **Not performed.** No Chrome/Chromium, Edge, Firefox or browser automation package was available. No screenshot review, physical viewport-overflow test, cross-browser check, screen-reader test or axe/WCAG automation was run. |
| Database/deployment | No database connection/migration, external map/social test or deployment was performed. |

The three new generated Blog assets are documented with dimensions and representative-image disclosure in `ASSET_SOURCES.md`. Existing third-party image terms were not independently verified; review them before commercial publication. The logo remains pending because no approved replacement asset was supplied. The source archive is `/home/user/northline-fm-updated-source.zip` and excludes `node_modules`/`dist`. The workspace preview on port 5173 serves local code; it is not a production deployment. For Vercel, use the repository root, Vite preset, `npm ci --include=dev`, `npm run build`, and output `dist`; Vercel's Vite guide documents an optional SPA rewrite for clean-path deep links. No deployment configuration was changed.

## Completion pass — logo, Blog, responsiveness and preservation (13 October 2026)

This entry supersedes earlier notes that the logo was pending and the Blog contained 14 posts. All 12 requested refinements were applied in the existing project; the SPA, route structure, both homepage designs, all service pages, backend/API/database, dashboards and sample workflows were preserved.

### Changes covered

- Created and integrated an original local Northline FM SVG mark and matching favicon.
- Kept short explanations naturally wrapping without line-clamp or public-copy ellipsis rules; compact ellipsis remains limited to workspace metadata. Maintained light and dark themes, readable navbar states and focus styling.
- Kept both Home destinations while removing the introductory dropdown label. Services remains a direct link and all 22 service-detail routes remain. Request a Service stays visible; desktop/tablet CSS collapses the navigation from 921–1360px and keeps the button `inline-flex`, with compact labels at smaller widths.
- Removed only automatic privacy-banner rendering; manual privacy preferences remain available.
- Added 10 substantive Blog articles, bringing the total to **24**, with unique local images, article sections/anchors, related links and service CTAs. Search, category filtering, pagination and article sharing/reading controls remain wired. The Blog background is scoped to Blog.
- Reviewed five new representative editorial photographs and documented provenance in `ASSET_SOURCES.md`. Their alternatives identify depicted people as illustrative rather than Northline employees.
- Kept Contact content-led, with a two-column details/map arrangement at tablet widths and a single-column mobile layout. Preview-only Google/Apple sign-in, local non-transmitting Contact, manual privacy settings, theme/direction controls, dashboard return links and exact 12-month pricing remain.

### Final verification

| Check | Result |
|---|---|
| `npm ci --include=dev` | **Passed:** 152 packages installed; 153 audited; 0 vulnerabilities reported. |
| `npm test` | **29 passed, 0 failed.** Includes 24-post content/reference/image checks, responsive navbar/Contact source assertions, logo/favicon, privacy, pricing, local-only Contact/sign-in and existing workflow tests. |
| `npm run build` | **Passed:** Vite 6.4.4; 17 modules transformed. |
| Syntax and locale data | `node --check` passed across frontend/backend source, tests and Prisma seed JavaScript. Locale JSON files parsed successfully. |
| Vite-rendered source audit | **97 routes** (63 public, 16 admin, 13 client, 5 technician), including 22 service-detail pages and 24 article pages. Checked 3,478 rendered links, 171 in-page anchors and 303 `<img>` elements. No broken audited internal route/anchor, missing local image, missing meaningful image alternative, blank/undefined page output or automatic privacy-banner markup. The 157 empty-alt logo images are intentionally decorative and `aria-hidden`, inside named home links. All 13 unique CSS image paths exist. This is a server-render/source audit, not browser rendering. |
| Vite HTTP smoke | The local server on port 5173 returned HTTP 200 for the app shell, favicon, new logo mark, all five new Blog photographs, Blog data module and stylesheet. This checks HTTP delivery only. |
| Representative palette pairs | Light body/paper **13.43:1**, light secondary/paper **7.63:1**, light muted/paper **5.92:1**; dark body/paper **15.94:1**, dark secondary/card **10.06:1**, dark muted/card **8.29:1**, dark link/card **9.86:1**, dark validation/card **7.93:1**; focus ring/light and dark paper **4.04:1 / 10.39:1**; primary-button text/light and dark **12.22:1 / 9.61:1**; original logo ivory/forest **11.37:1**. These are source-token calculations for representative pairs, not a complete rendered-state WCAG audit. |
| Browser, viewport, screen-reader and automated accessibility checks | **Not run.** Chrome, Edge, Chromium and Firefox binaries, Playwright and Puppeteer were not available. No screenshot, actual-width overflow, browser-engine, screen-reader or axe/WCAG test is claimed. The Edge/Chrome navbar behavior therefore remains unconfirmed at runtime; source rules and responsive breakpoints were audited. |
| Lint, database and deployment | No lint script is configured. No database migration, production API setup, external map/social test or deployment was performed. |

The Vite production build and workspace preview are local only. The live preview is not a Vercel/production deployment. For Vercel, select the existing Vite project root, run `npm ci --include=dev` and `npm run build`, and publish `dist`; a clean-path SPA rewrite is only needed if moving away from the current hash routes. The Express/Prisma API and PostgreSQL database require a separate compatible deployment. No deployment config or credentials were added. Refreshed source archive: `/home/user/northline-fm-updated-source.zip` (109 files; ZIP integrity checked; excludes `node_modules` and `dist`).

## Screenshot-driven whitespace, filtered-card and responsive type pass (13 October 2026)

This focused follow-up responds to five newly supplied page captures. It edits the existing application and keeps its Vite/Express/Prisma structure, public routes, both homepage designs, 22 service-detail pages, 24 Blog articles, dashboards/workflows, API/database, theme/direction controls, preview-only provider sign-in, non-transmitting Contact form, exact pricing and Blog-only background treatment intact. No production deployment was performed.

### Changes delivered

- Reduced the shared public section padding from 100px to a responsive 44–64px desktop range and 38px at narrow widths. Tightened the Home services-to-operations handoff and the Services/Blog directory gutters without removing deliberate section separation.
- Rebalanced the About story: the existing plant-room photograph now sits alongside the unchanged copy on desktop; tablet/mobile stack it cleanly. Captions remain meaningful and representative imagery is not presented as an actual staff photograph.
- Moved the Contact form/supporting layout to one main column by 1180px, with a two-column details/map area and a single-column narrow-screen flow. Added minimum-width protections to avoid grid children forcing horizontal overflow.
- Added count-aware Services and Blog result-grid states. One filtered result uses the full row; small sets are balanced, and the final card spans the row where a one-card remainder would otherwise leave a conspicuous blank column. Existing filter/search/pagination behavior and empty states remain.
- Added concise, editorial card-specific summaries for all 22 services, 24 Blog posts and 12 industry cards. Image-card explanations render at 16px and remain one line at desktop/tablet widths without ellipsis, line-clamp or smaller type. Full service descriptions and article copy remain available on their detail pages; full industry descriptions stay available in native keyboard-operable “More context” disclosures. Text wraps naturally on narrow screens.
- Applied a public type scale of body 17px desktop / 16px narrow, H1 32–48px, H2 24–34px, H3 24–30px and text-heavy article copy 18–20px. Compact labels and functional metadata remain 12–14px; light/dark contrast and focus-token distinctions are retained.

### Verification performed

| Check | Result |
|---|---|
| `npm ci --include=dev` | Passed: 152 packages installed; 153 audited; **0 vulnerabilities** reported. No dependency versions were changed. |
| `npm test` | **32 passed, 0 failed.** Added regression assertions for summary lengths/content preservation, one-line desktop rules, responsive wrapping, result-count layouts, section spacing, typography, About structure and Contact wrapping. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| Public Vite SSR/source audit | **63 public routes** rendered (including all 22 service-detail routes and 24 Blog articles); 269 `<img>` elements and 165 in-page anchors checked. No missing local image, missing meaningful alt, broken audited in-page target, blank/undefined public output or automatic privacy-banner markup was found. The 123 decorative logo marks are `aria-hidden`. This is server-render/source verification, not browser rendering. |
| Browser, viewport, visual, screen-reader and automated accessibility tests | **Not run.** No browser executable or Playwright/Puppeteer was available. No screenshot, actual viewport-overflow measurement, cross-browser/device, screen-reader or axe/WCAG test is claimed. |
| Deployment/backend | No deployment, database migration, API setup or production configuration was performed. The local preview is not production. |

`IMPLEMENTATION_REPORT.md` records the current summary. The refreshed source archive is `/home/user/northline-fm-updated-source.zip`; it excludes `node_modules` and generated `dist`. QA source checks and SSR results do not establish rendered visual fit; open the local preview in a real browser and check the supplied widths before production use.

## Dark-mode visibility follow-up (13 October 2026)

This focused change responds to the latest screenshots while preserving the existing application and keeping the new CSS scoped to the explicit dark theme. The light-theme appearance, routes, content, backend/API/database, dashboards and workflows were not changed.

### Changes delivered

- Replaced the fixed pale trust/client-name strip surface in dark mode with the existing dark surface token; the client names, decorative wordmarks and supporting note now use the readable dark secondary-text color, with client-name opacity restored to full.
- Gave the CTA band a distinct deep-dark background and adjusted its eyebrow, heading/emphasis and supporting label colors for that surface.
- Replaced the certification/“Illustrative Examples” section’s fixed pale background in dark mode, and explicitly set readable heading, credential-list, disclosure and check-icon/badge colors.
- Added a public-experience regression test that checks these dark-theme-specific selectors and key foreground/background treatments. No light-theme rule was edited by this follow-up.

### Verification performed

| Check | Result |
|---|---|
| `npm ci --include=dev` | Passed; 152 packages installed, 153 audited, **0 vulnerabilities**. A first test/build attempt before install could not resolve dependencies because `node_modules` is excluded from workspace snapshots; checks were rerun successfully after installation. |
| `npm test` | **33 passed, 0 failed.** Includes the new trust/CTA/certification dark-mode regression test and the existing functionality/layout coverage. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| JavaScript syntax | `node --check` passed across frontend/backend source and test JavaScript. |
| Representative dark-palette contrast calculations | Trust secondary text on dark section **8.80:1**; CTA white/accent text on deep band **16.95:1 / 11.39:1**; credential emphasis on dark section **8.32:1**; check-icon foreground on its badge **7.43:1**. These are named-color calculations, not a complete rendered-component/state WCAG audit. |
| Route/SSR and HTTP audit | Not repeated for this CSS-only follow-up. The preceding pass’s audit remains **63 public routes**, 269 image elements and 165 in-page anchors with no reported source/render issues; it is not browser rendering. |
| Browser/device/accessibility review | **Not run.** No screenshot/browser rendering, actual viewport review, screen-reader test or automated accessibility audit is claimed. |
| Deployment/backend | No deployment, database migration, API setup or production configuration was performed. |

The refreshed source archive is `/home/user/northline-fm-updated-source.zip`; it excludes `node_modules` and generated `dist`. The workspace preview, if running, is local-only and not a production deployment.

## Screenshot whitespace, row balance and typography follow-up (13 October 2026)

This focused pass responds to the latest attached captures. The added blank areas corresponded to orphan cards at the end of the Services/Blog grids and a two-column Contact composition. Existing site content was reflowed; no fictional statistics or unrelated features were added.

### Changes delivered

- Services filter logic now marks orphan endings for both three-column and two-column grids. A lone final service card spans the available row and uses its existing image, summary and route link rather than leaving the remainder empty.
- Blog pagination now tracks six visible cards and detects the first page’s featured article. The final row is balanced into two equal-width cards on wider screens; at two-column widths, the final existing article becomes a full-row horizontal card. The mobile list remains a natural one-column stack.
- Reflowed Contact to a full-width, single-column form followed by its existing supporting information grid at all viewport widths. The supporting cards use two columns except on narrow screens. Map, office details, social links, service contact and FAQ retain their content.
- Applied one consistent site font stack (the existing Inter/UI-sans/system fallback) to form controls and formerly serif accent copy. Workspace form labels are 14px and entered values 16px, like other forms.
- Confirmed the requested type scale in source: body 17px desktop / 16px narrow, H1 32–48px, H2 24–34px, H3 24–30px, long-form editorial copy 18–20px and compact labels/captions 12–14px.

### Verification performed

| Check | Result |
|---|---|
| `npm ci --include=dev` | Passed; 152 packages installed, 153 audited, **0 vulnerabilities**. The extracted workspace omits `node_modules`, so dependencies were installed before final checks. |
| `npm test` | **35 passed, 0 failed.** New regression tests cover orphan Service/Blog endings, Contact stacking and use of the same font stack across copy and controls. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| JavaScript syntax | `node --check` passed across frontend/backend source and test JavaScript. |
| Vite HTTP smoke | Local preview returned **HTTP 200** for the app shell, stylesheet and JavaScript modules. This is delivery smoke only, not rendered visual validation. |
| Route/SSR audit | Not repeated for this CSS/grid-focused pass. The previous audit remains 63 public routes, 269 images and 165 in-page anchors; those are server-render/source checks, not browser rendering. |
| Browser/viewport/accessibility | **Not run.** No browser screenshot, rendered viewport check, overflow measurement, screen-reader test or automated accessibility audit is claimed. |
| Deployment/backend | No deployment, database migration, API setup or production configuration was performed. |

The updated project report is `IMPLEMENTATION_REPORT.md`; the refreshed 109-file archive is `/home/user/northline-fm-updated-source.zip`, excluding `node_modules` and generated `dist`.

### Contact whitespace correction (13 October 2026)

The latest Contact capture still showed the enquiry form ending above a taller right-hand information column, leaving unused space beside it at the browser’s effective width. Changed Contact to a **single-column main layout at every width**, with the form above the existing support cards; those cards use two columns on wider screens and one column on narrow screens. Also made workspace form labels 14px and entered values 16px, matching the readable scale used by public forms. No Contact text, map, privacy disclosure or other functionality was removed.

`npm test` remains **35/35 passing**, `npm run build` passes with Vite 6.4.4, and JavaScript syntax checks pass. This follow-up received source/regression/build checks only—no browser rendering or visual viewport test was performed.

## Responsive dashboard toolbar follow-up (13 October 2026)

This focused change delivers the requested dashboard navigation update while preserving the Vite SPA, Express/Prisma/PostgreSQL foundation, routes, workspace workflows, sample data, local theme/direction settings and desktop toolbar arrangement. No production deployment was performed.

### Changes delivered

- Removed the language selector and its dashboard-topbar-specific code/styles across the admin, client and technician workspaces. Language and region preferences remain available in each relevant Settings view.
- Kept search, theme, notifications and profile in the top bar on larger screens. At viewport widths up to 1160px, the hamburger opens the existing sidebar drawer with a matching workspace search and quick-action controls; the larger-screen controls are hidden there so they are not duplicated visually on tablet/mobile.
- Reused existing delegated actions for search, theme, notification routing and the profile menu. The Cmd/Ctrl+K shortcut opens the drawer and focuses its search on compact screens; Enter retains its prior search navigation. Menu open/close state updates its accessible label and `aria-expanded`, focus moves into the drawer when opened and returns to the menu control when closed, and Escape dismisses the drawer/profile menu.
- Added a source regression test for header language removal, desktop toolbar retention, responsive control placement, and hamburger/accessibility behavior. No routes, API, backend, database or business workflows changed.

### Verification performed

| Check | Result |
|---|---|
| `npm ci --include=dev` | Passed from the project root; 152 packages installed, 153 audited, **0 vulnerabilities** reported. |
| `npm test` | **36 passed, 0 failed**, including the new dashboard toolbar regression test and the prior content, route, pricing, security-boundary and workflow coverage. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| JavaScript syntax | `node --check` passed for the changed dashboard renderer, main event handlers and frontend regression test. A source search found no remaining dashboard-topbar locale-selector IDs/classes; Settings locale controls remain. |
| Vite HTTP smoke | Local preview returned HTTP 200 for the app shell and changed frontend resources. This verifies delivery only, not rendered behavior. |
| Browser/device/accessibility review | **Not run.** No real browser/device screenshot, measured viewport-overflow check, screen-reader review or automated axe/WCAG audit is claimed. CSS/source tests do not replace in-browser visual and interaction verification. |
| Deployment/backend | No deployment, database migration, API setup or production configuration was performed. |

The local preview is not a production deployment. The latest source archive is `/home/user/northline-fm-updated-source.zip`; it excludes `node_modules` and generated `dist`.

## Public-header and mobile/tablet alignment follow-up (13 October 2026)

This latest browser-based follow-up supersedes earlier entries that described the UI reviews as source-only for the checks listed here. It leaves the existing app/backend/database architecture and production state unchanged.

### Responsive changes checked

- Public LTR/RTL, theme and Request service controls stay inside the hamburger menu through 1360px; the desktop control row returns above that breakpoint.
- At 320px, service-detail scope cards stack while keeping full-size text; narrow metric annotations wrap as separate lines; the admin status chart uses a readable, full-label list with all sample counts.
- The Services spotlight image fits its two-column tablet grid at 768px after removing a minimum-height constraint in the 761–920px range.
- No global overflow clipping was introduced; scope text, chart labels and values, navigation controls and feature imagery remain present.

### Latest verification

| Check | Result |
|---|---|
| `npm test` | **38 passed, 0 failed.** Includes public menu and responsive narrow-layout regression assertions. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| JavaScript/locale syntax | `node --check` passed for frontend/backend source and tests and the Prisma seed; frontend locale JSON parsed successfully. |
| Playwright/Chromium rendered-layout audit | **97 routes at 320, 390, 768 and 1024px** (388 rendered route/viewport checks): no document horizontal overflow, missing main/title or page errors. Route set: 16 static public paths, 22 service details, 24 Blog articles, one fallback route, 16 admin, 13 client and 5 technician paths. |
| Public navigation behavior | Menu and controls checked at 320, 390, 768, 1024 and 1360px; desktop controls checked at 1361 and 1440px. LTR/RTL direction persistence, theme toggle and Request service navigation were exercised; Escape closed the menu and restored focus to its toggle. |
| Visual spot review | Screenshots visually reviewed for service-detail scope cards, admin/client metric cards and the compact admin status list at 320px, and the Services spotlight at 768px. The 97-route audit measured every route for overflow/landmarks but did not visually review every route individually. |
| Limits | No full screen-reader/axe/WCAG audit, physical-device test or Edge/Firefox cross-browser run. Keyboard checks were limited to the described menu Escape/focus behavior. No backend/API/database setup, migration or production deployment occurred. |

The local Vite preview on port 5173 is not a deployment. The updated source archive is `/home/user/northline-fm-updated-source.zip`; it is refreshed and ZIP-integrity-checked after these report updates, excluding `node_modules` and generated `dist`.

## Phone preview alignment and compact header follow-up (13 October 2026)

This follow-up addresses the attached mobile screenshots. The earlier compact-navigation and all-route findings remain; this newest section supersedes earlier results for the checks listed here.

### Fixes reviewed

- Home client-preview badges now flow below the workspace card at phone widths, leaving its heading, sample metrics, activity chart and work-order row unobscured.
- Smart insight badges now flow below the analytics card. The brand/period header stacks and stats reflow at narrow phone widths; chart-day labels wrap into separated cells on the smallest screens.
- The existing “northline FM” wordmark is shown beside the logo at widths up to 400px. The compact hamburger aligns to the opposite edge through 1360px; the desktop control row remains above that width.
- All badge copy and preview data are retained; no global clipping or reduced-size workaround was added.

### Latest verification

| Check | Result |
|---|---|
| `npm test` | **39 passed, 0 failed.** New regression coverage includes phone preview badge placement and logo/menu alignment. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| Syntax | `node --check` passed for frontend/backend source, tests and Prisma seed; locale JSON parsed successfully. |
| Playwright/Chromium route audit | **97 routes × 4 widths** (320, 390, 768, 1024px): no document overflow, missing main/title or page errors. |
| Visual review | Reviewed screenshots at 320/372px for Home, 320/351px for Smart, and 320/382px for the header. The callouts now sit below their preview panels, and the logo/wordmark and hamburger sit at opposite ends. |
| Menu interaction | At 320, 390, 768, 1024, 1360, 1361 and 1440px, compact-menu/desktop-row visibility and placement were checked. Escape close/focus return, direction changes, theme toggle and Request service navigation were exercised in Chromium. |
| Limits | No Edge/Firefox/physical-device or screen-reader run and no full axe/WCAG audit. No production deployment, migration or API/database setup occurred; the port-5173 preview is local-only. |

The source archive at `/home/user/northline-fm-updated-source.zip` contains 109 files, passes ZIP integrity checking, and excludes `node_modules` and generated `dist`.

## Dark-mode login alignment follow-up (13 October 2026)

This focused correction responds to the supplied login capture. The form copy, route, theme distinction, preview-only disclosure and sign-in behavior remain in place; no backend, API, database or credential-handling behavior was changed.

### Changes delivered

- Increased the login panel’s responsive maximum width to **430px** and explicitly centered it within the auth column; the form retains the same full width.
- Changed provider buttons to auto-fit based on available card width: a two-column row where each button has 210px available, otherwise a full-width single-column layout. On narrow phones, provider icons and labels share a consistent start edge. No text-size reduction was introduced.

### Verification performed

| Check | Result |
|---|---|
| `npm ci --include=dev` | Passed; 152 packages installed, 153 audited, **0 vulnerabilities** reported. |
| `npm test` | **40 passed, 0 failed**, including the new authentication alignment regression. |
| `npm run build` | Passed with Vite 6.4.4; 17 modules transformed. |
| Playwright/Chromium login viewport check | Reviewed the dark-mode page at **546 × 668 CSS px** with a 1.25 device scale factor (682 × 835 screenshot output). The auth card was exactly centered and there was no horizontal overflow. Measured widths 320, 390, 546, 682, 768 and 1024px; document width matched viewport width throughout. Provider controls used two columns when the card could fit them and one column at narrower card widths. |
| Preview-only interaction | Submitting sample credentials stayed on `#/login` with **zero `/api` requests**. Clicking Google kept the existing sign-in disclosure visible and also made zero API requests; no browser page errors occurred. |
| Limits | No full screen-reader/axe/WCAG audit, physical-device test, backend/API integration or production deployment was performed. The Vite preview is local-only. |

The refreshed source archive is `/home/user/northline-fm-updated-source.zip`; it passes ZIP integrity checking and excludes `node_modules` and generated `dist`.
