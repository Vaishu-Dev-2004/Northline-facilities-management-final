import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { blogPosts, services } from '../src/demoData.js';

const projectRoot = resolve(process.cwd());
const readSource = (path) => readFileSync(resolve(projectRoot, path), 'utf8');
const wordCount = (value) => String(value || '').trim().split(/\s+/).filter(Boolean).length;

test('Dashboard quick actions move into the hamburger drawer on tablet/mobile and the header language selector is removed', () => {
  const dashboards = readSource('frontend/src/dashboards.js');
  const main = readSource('frontend/src/main.js');
  const styles = readSource('frontend/src/styles.css');
  const topbarStart = dashboards.indexOf('function appTopbar(kind, title) {');
  const topbarEnd = dashboards.indexOf('function adminShell', topbarStart);
  const topbar = dashboards.slice(topbarStart, topbarEnd);
  const sidebarStart = dashboards.indexOf('function appSidebar(kind, active) {');
  const sidebarEnd = dashboards.indexOf('function appTopbar', sidebarStart);
  const sidebar = dashboards.slice(sidebarStart, sidebarEnd);
  assert.ok(topbarStart >= 0 && topbarEnd > topbarStart);
  assert.doesNotMatch(topbar, /locale-select|app-locale-select|Language/);
  assert.match(topbar, /class="app-topbar-actions"[\s\S]*?data-global-search[\s\S]*?data-action="toggle-theme"[\s\S]*?data-action="open-notifications"[\s\S]*?data-action="profile-menu"/);
  for (const marker of ['sidebar-mobile-tools', 'sidebar-mobile-search', 'data-action="toggle-theme"', 'data-action="open-notifications"', 'data-action="profile-menu"']) {
    assert.ok(sidebar.includes(marker), `The drawer should include ${marker}`);
  }
  assert.match(styles, /@media \(max-width:1160px\)[\s\S]*?\.app-topbar-actions \{ display:none; \}[\s\S]*?\.sidebar-mobile-tools \{ display:grid;/);
  assert.match(styles, /@media \(max-width:1160px\)[\s\S]*?\.sidebar-toggle \{ display:grid/);
  assert.match(main, /sidebarMenu\?\.querySelector\('\.sidebar-mobile-search \[data-global-search\]'\)\?\.focus\(\)/);
  assert.match(main, /trigger\?\.setAttribute\('aria-expanded', String\(Boolean\(open\)\)\)/);
  assert.match(main, /trigger\?\.setAttribute\('aria-label', open \? 'Close navigation' : 'Open navigation'\)/);
});

test('Public tablet/mobile display and service controls are inside the hamburger menu', () => {
  const components = readSource('frontend/src/components.js');
  const styles = readSource('frontend/src/styles.css');
  const main = readSource('frontend/src/main.js');
  const headerStart = components.indexOf('export function publicHeader(');
  const headerEnd = components.indexOf('\nexport function footer()', headerStart);
  const header = components.slice(headerStart, headerEnd);
  assert.ok(headerStart >= 0 && headerEnd > headerStart);
  assert.match(header, /<nav class="primary-nav"[\s\S]*?class="mobile-nav-actions"[\s\S]*?data-action="set-direction"[\s\S]*?class="icon-button theme-toggle"[\s\S]*?class="btn btn-primary btn-small mobile-nav-request"/);
  assert.match(header, /<div class="nav-actions">[\s\S]*?class="direction-control"[\s\S]*?class="icon-button theme-toggle"[\s\S]*?class="btn btn-primary btn-small nav-request"/);
  assert.match(styles, /\.mobile-nav-actions \{ display:none; \}/);
  assert.match(styles, /@media \(max-width:1360px\) \{\s*\.nav-actions \{ display:none; \}[\s\S]*?\.mobile-nav-actions \{ display:grid;/);
  assert.match(styles, /\.primary-nav\.open \{[\s\S]*?overflow-y:auto/s);
  assert.match(main, /const publicNav = document\.querySelector\('\.primary-nav\.open'\)/);
  assert.match(main, /const menuButton = document\.querySelector\('\.mobile-menu-toggle'\)/);
  assert.match(main, /menuButton\?\.setAttribute\('aria-expanded', 'false'\)/);
});

test('Phone preview callouts no longer cover dashboard content and the header brand/menu align apart', () => {
  const styles = readSource('frontend/src/styles.css');
  assert.ok(styles.includes('.portal-float { position:static;align-self:flex-start;width:fit-content;max-width:100%; }'));
  assert.ok(styles.includes('.portal-float-top { align-self:flex-end; }'));
  assert.ok(styles.includes('.smart-float { position:static;width:fit-content;max-width:100%; }'));
  assert.ok(styles.includes('.device-top { align-items:flex-start;flex-direction:column;gap:4px; }'));
  assert.ok(styles.includes('.mobile-menu-toggle { margin-inline-start:auto; }'));
  assert.ok(styles.includes('.brand-wordmark { display:flex;min-width:0; }'));
});

test('Authentication panel remains centered and provider actions align at narrow widths', () => {
  const styles = readSource('frontend/src/styles.css');
  assert.match(styles, /\.auth-card \{ width:min\(430px,100%\);min-width:0;margin-inline:auto; \}/);
  assert.match(styles, /\.auth-form \{ width:100%;min-width:0; \}/);
  assert.match(styles, /\.auth-social-buttons \{ grid-template-columns:repeat\(auto-fit,minmax\(min\(100%,210px\),1fr\)\); \}/);
  assert.match(styles, /@media \(max-width:480px\)[\s\S]*?\.auth-social-button \{ justify-content:flex-start;/);
});

test('Narrow workspace cards and status chart reflow without horizontal overflow', () => {
  const dashboards = readSource('frontend/src/dashboards.js');
  const styles = readSource('frontend/src/styles.css');
  assert.match(dashboards, /<ul class="mobile-status-list" aria-label="Sample work orders by status">\$\{statusCounts\.map/);
  assert.match(styles, /@media \(max-width:390px\)[\s\S]*?\.metric-foot \{[^}]*flex-direction:column;/);
  assert.match(styles, /@media \(max-width:700px\)[\s\S]*?\.orders-chart \{ display:none; \}[\s\S]*?\.mobile-status-list \{ display:grid;/);
  assert.match(styles, /@media \(max-width:359px\)[\s\S]*?\.scope-grid \{ grid-template-columns:minmax\(0,1fr\); \}/);
  assert.match(styles, /@media \(min-width:761px\) and \(max-width:920px\)[\s\S]*?\.services-spotlight-visual \{ min-height:0; \}/);
});

test('Blog includes twenty-four distinct, substantial articles with working related references', () => {
  assert.equal(blogPosts.length, 24);
  assert.equal(new Set(blogPosts.map((post) => post.slug)).size, blogPosts.length);
  assert.equal(new Set(blogPosts.map((post) => post.id)).size, blogPosts.length);
  assert.equal(new Set(blogPosts.map((post) => post.image)).size, blogPosts.length);
  const slugs = new Set(blogPosts.map((post) => post.slug));
  const serviceRoutes = new Set(services.map((service) => `#/services/${service.slug}`));

  for (const post of blogPosts) {
    const text = [post.title, post.excerpt, post.description, post.intro, post.conclusion,
      ...post.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.list || [])]),
      ...(post.keyInsights || []), ...(post.tags || []), post.cta?.title, post.cta?.body].join(' ');
    assert.ok(wordCount(text) >= 300, `${post.slug} should be a substantial article`);
    assert.ok(post.sections.length >= 3, `${post.slug} should have structured sections`);
    const sectionIds = post.sections.map((section) => section.id);
    assert.ok(sectionIds.every(Boolean), `${post.slug} has a section without an anchor ID`);
    assert.equal(new Set(sectionIds).size, sectionIds.length, `${post.slug} has duplicate section IDs`);
    assert.ok((post.relatedSlugs || []).every((slug) => slugs.has(slug)), `${post.slug} has a broken related article`);
    assert.ok(serviceRoutes.has(post.cta?.href), `${post.slug} has a broken service CTA`);
    assert.ok(post.imageAlt?.trim(), `${post.slug} needs meaningful image alternative text`);
  }
});

test('pricing keeps the supplied monthly values and exact twelve-month annual totals', () => {
  const marketing = readSource('frontend/src/marketing.js');
  const main = readSource('frontend/src/main.js');
  assert.match(marketing, /data-monthly-price="₹9,999" data-annual-price="₹1,19,988"/);
  assert.match(marketing, /data-monthly-price="₹24,999" data-annual-price="₹2,99,988"/);
  assert.equal(9_999 * 12, 119_988);
  assert.equal(24_999 * 12, 299_988);
  assert.match(marketing, /Annual prices equal 12 monthly payments; no discount is applied/);
  assert.match(main, /function updateBillingPrices\(frequency = 'monthly'\)/);
  assert.match(main, /setAttribute\('aria-pressed', String\(selected\)\)/);
  assert.match(main, /data-billing-status/);
});

test('preview sign-in, Contact, Dashboard return and theme/direction controls stay local and available', () => {
  const main = readSource('frontend/src/main.js');
  const components = readSource('frontend/src/components.js');
  const marketing = readSource('frontend/src/marketing.js');
  const dashboards = readSource('frontend/src/dashboards.js');
  const socialStart = main.indexOf("case 'social-signin':");
  const socialEnd = main.indexOf("case 'set-theme':", socialStart);
  const contactStart = main.indexOf("if (type === 'contact')");
  const contactEnd = main.indexOf("} else if (type === 'newsletter')", contactStart);
  assert.ok(socialStart >= 0 && socialEnd > socialStart);
  assert.ok(contactStart >= 0 && contactEnd > contactStart);
  assert.match(main.slice(socialStart, socialEnd), /No authentication request was sent/);
  assert.doesNotMatch(main.slice(socialStart, socialEnd), /fetch\s*\(/);
  assert.match(main.slice(contactStart, contactEnd), /not connected to an enquiry inbox/);
  assert.doesNotMatch(main.slice(contactStart, contactEnd), /fetch\s*\(/);
  assert.match(marketing, /data-form="contact"/);
  assert.match(dashboards, /class="back-to-website" href="#\/" aria-label="Back to Website"/);
  assert.match(components, /data-action="toggle-theme"/);
  assert.match(components, /data-action="set-direction"/);
  assert.match(main, /case 'toggle-theme':/);
  assert.match(main, /case 'set-direction':/);
});

test('the latest Blog topics use visually reviewed, distinct representative imagery', () => {
  const expectedImages = new Map([
    ['electrical-safety-facilities-routine', '/assets/blog/electrical-safety-routine.jpg'],
    ['building-automation-alert-playbook', '/assets/blog/building-automation-alert-playbook.jpg'],
    ['asset-lifecycle-plan-condition-renewal', '/assets/blog/asset-lifecycle-condition-review.jpg'],
    ['facilities-service-mobilisation-first-90-days', '/assets/blog/facilities-mobilisation-planning.jpg'],
    ['commercial-hvac-maintenance-routine', '/assets/blog/hvac-maintenance-routine.jpg'],
    ['energy-efficiency-operating-schedules', '/assets/blog/energy-efficiency-operations.jpg'],
    ['commercial-water-systems-leak-prevention', '/assets/blog/water-systems-leak-prevention.jpg'],
    ['contractor-coordination-permit-to-work', '/assets/blog/contractor-work-coordination.jpg'],
  ]);
  const serviceImages = new Set(services.map((service) => service.image));

  for (const [slug, image] of expectedImages) {
    const post = blogPosts.find((candidate) => candidate.slug === slug);
    assert.ok(post, `Missing Blog article ${slug}`);
    assert.equal(post.image, image);
    assert.ok(post.imageAlt.toLowerCase().includes('representative'), `${slug} must not imply an actual employee photo`);
    assert.ok(!serviceImages.has(post.image), `${slug} should use its distinct editorial image`);
    assert.ok(existsSync(resolve(projectRoot, 'frontend/public', image.slice(1))), `Missing ${image}`);
  }
});

test('Blog search, category filtering, pagination and article reading controls remain wired', () => {
  const marketing = readSource('frontend/src/marketing.js');
  const main = readSource('frontend/src/main.js');
  assert.match(marketing, /id="blog-search"/);
  assert.match(marketing, /data-blog-filter=/);
  assert.match(marketing, /data-blog-pagination/);
  assert.match(marketing, /aria-label="On this page"/);
  assert.match(marketing, /data-action="share" aria-label="Copy article link"/);
  assert.match(marketing, /id="key-insights"/);
  assert.match(marketing, /id="conclusion"/);
  assert.match(main, /function applyBlogFilters\(\)/);
  assert.match(main, /const pageSize = 6/);
  assert.match(main, /data-blog-page/);
});

test('all service and article image references resolve to local project assets', () => {
  for (const record of [...services, ...blogPosts]) {
    assert.ok(record.image.startsWith('/assets/'), `${record.name || record.slug} should use a local asset`);
    assert.ok(existsSync(resolve(projectRoot, 'frontend/public', record.image.slice(1))), `Missing ${record.image}`);
  }
});

test('Home retains both destinations, Services is a direct link, and the CTA has a narrow-screen label', () => {
  const components = readSource('frontend/src/components.js');
  const styles = readSource('frontend/src/styles.css');
  assert.equal((components.match(/class="home-version-option"/g) || []).length, 2);
  assert.match(components, /href="#\/"/);
  assert.match(components, /href="#\/smart"/);
  assert.doesNotMatch(components, /Choose your homepage|Two ways to explore/);
  assert.match(components, /<a href="#\/services" class="nav-link[^\"]*">\$\{t\('nav\.services'\)\}<\/a>/);
  assert.doesNotMatch(components, /nav-item has-dropdown"><a href="#\/services"/);
  assert.match(components, /class="btn btn-primary btn-small nav-request"[^>]*aria-label=/);
  assert.match(components, /nav-request-label-compact/);
  assert.match(components, /nav-request-label-tiny/);
  assert.match(styles, /@media \(max-width: 1360px\) and \(min-width: 921px\) \{[\s\S]*?\.primary-nav \{[^}]*display: none;/);
  assert.match(styles, /\.nav-request \{ flex:0 0 auto; white-space:nowrap; \}/);
  assert.match(styles, /@media \(max-width:1360px\) \{[\s\S]*?\.nav-actions \.nav-request \{ display:inline-flex!important;/);
  assert.match(styles, /@media \(max-width:480px\) \{[\s\S]*?\.nav-request-label-tiny \{ display:inline; \}/);
});

test('automatic privacy banner injection is absent while manual preferences remain available', () => {
  const main = readSource('frontend/src/main.js');
  const components = readSource('frontend/src/components.js');
  const marketing = readSource('frontend/src/marketing.js');
  assert.match(main, /app\.innerHTML = page\.html;/);
  assert.doesNotMatch(main, /cookieBannerMarkup|cookieBanner\(/);
  assert.doesNotMatch(components, /export function cookieBanner\(/);
  assert.match(main, /case 'cookie-customize': openCookieSettings\(\)/);
  assert.match(marketing, /data-action="cookie-customize">Manage cookie choices/);
});

test('Contact remains content-led at desktop, tablet and mobile widths, with readable component copy', () => {
  const styles = readSource('frontend/src/styles.css');
  assert.match(styles, /\.contact-page \.contact-layout \{ grid-auto-rows:max-content; align-content:start; \}/);
  assert.match(styles, /@media \(max-width:1024px\)\s*\{\s*\.contact-page \.contact-layout \{[^}]*\}\s*\.contact-page \.contact-aside \{ grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/s);
  assert.match(styles, /@media \(max-width:700px\)\s*\{\s*\.contact-page \.contact-layout \{[^}]*\}\s*\.contact-page \.contact-aside \{ grid-template-columns:minmax\(0,1fr\)/s);
  assert.doesNotMatch(styles, /main:not\(\.app-content\) p\s*\{[^}]*!important/);
  assert.doesNotMatch(styles, /line-clamp/);
  assert.doesNotMatch(styles, /\.service-card p\s*\{[^}]*text-overflow/);
  assert.doesNotMatch(styles, /\.image-card-summary\s*\{[^}]*text-overflow/);
  assert.match(styles, /\.page-intro-grid > p \{ max-width:560px; \}/);
  assert.match(styles, /\.image-card-summary\s*\{[\s\S]*?font-size:16px!important;/);
  assert.match(styles, /--type-h3:clamp\(24px,/);
  assert.match(styles, /@media \(max-width:1180px\)\s*\{\s*\.page-contact \.contact-layout \{ grid-template-columns:minmax\(0,1fr\)/s);
  assert.match(styles, /:root\[data-theme="dark"\] \.contact-details p strong \{ color:var\(--ink\); \}/);
  assert.match(styles, /:root\[data-theme="dark"\] \.pricing-card li,\s*:root\[data-theme="dark"\] \.faq-list details p \{ color:var\(--ink-2\); \}/);
});

test('the original Northline FM logo and favicon resolve while the Blog background remains page-scoped', () => {
  const icons = readSource('frontend/src/icons.js');
  const styles = readSource('frontend/src/styles.css');
  const mark = readSource('frontend/public/assets/brand/northline-fm-mark.svg');
  const favicon = readSource('frontend/public/favicon.svg');
  assert.match(icons, /const BRAND_MARK_ASSET = '\/assets\/brand\/northline-fm-mark\.svg'/);
  assert.match(icons, /data-logo-asset-state="created"/);
  assert.match(icons, /Northline FM — Facilities Management home/);
  assert.match(mark, /viewBox="0 0 48 48"/);
  assert.match(favicon, /viewBox="0 0 64 64"/);
  assert.match(mark, /#173B38/);
  assert.match(favicon, /#173B38/);
  assert.match(styles, /\.page-blog \.page-intro \{ --page-backdrop:url\('\/assets\/blog\/facilities-field-notes\.jpg'\); \}/);
  assert.match(styles, /:root\[data-theme="dark"\] \.page-blog \.blog-directory[^\n]*facilities-field-notes\.jpg/);
  assert.match(styles, /\.nav-actions \.nav-request\s*\{\s*display:inline-flex!important;/);
  assert.match(styles, /:root\[data-theme="dark"\] \.site-header/);
  assert.match(styles, /:root\[data-theme="dark"\] \.btn-primary\s*\{[^}]*color:#102017/s);
});

test('Image-card explanations use full-size concise summaries and preserve the underlying copy', () => {
  const components = readSource('frontend/src/components.js');
  const marketing = readSource('frontend/src/marketing.js');
  const styles = readSource('frontend/src/styles.css');
  assert.equal(services.length, 22);
  assert.equal(blogPosts.length, 24);
  for (const service of services) {
    assert.ok(service.cardExcerpt?.trim(), `${service.slug} needs a concise card explanation`);
    assert.ok(service.cardExcerpt.length <= 45, `${service.slug} card explanation should fit on one line`);
  }
  for (const post of blogPosts) {
    assert.ok(post.cardExcerpt?.trim(), `${post.slug} needs a concise card explanation`);
    assert.ok(post.cardExcerpt.length <= 45, `${post.slug} card explanation should fit on one line`);
    assert.ok(post.excerpt.length > post.cardExcerpt.length, `${post.slug} should retain its full editorial excerpt`);
  }
  assert.match(components, /class="image-card-summary">\$\{service\.cardExcerpt \|\| service\.description\}/);
  assert.match(marketing, /class="image-card-summary">\$\{post\.cardExcerpt \|\| post\.excerpt\}/);
  assert.match(marketing, /class="image-card-summary industry-detail-summary">\$\{item\.cardDescription\}/);
  assert.match(marketing, /<details class="industry-detail-more"><summary>More context<\/summary><p>\$\{item\.description\}<\/p><\/details>/);
  assert.match(styles, /\.image-card-summary\s*\{[\s\S]*?font-size:16px!important;/);
  assert.match(styles, /@media \(min-width:761px\)\s*\{\s*\.image-card-summary \{ white-space:nowrap; \}/);
  assert.match(styles, /@media \(max-width:760px\)\s*\{\s*\.image-card-summary \{ white-space:normal; \}/);
  assert.doesNotMatch(styles, /\.image-card-summary\s*\{[^}]*text-overflow/);
});

test('Filtered Service and Blog results expand into available space instead of leaving sparse columns', () => {
  const main = readSource('frontend/src/main.js');
  const styles = readSource('frontend/src/styles.css');
  assert.match(main, /grid\.classList\.toggle\('has-one-result', count === 1\)/);
  assert.match(main, /grid\.dataset\.resultCount = String\(visibleCards\.length\)/);
  assert.match(main, /last-visible-result/);
  assert.match(styles, /#services-grid\.has-one-result \{ grid-template-columns:minmax\(0,1fr\); \}/);
  assert.match(styles, /\.blog-grid\.has-one-result \{ grid-template-columns:minmax\(0,1fr\); \}/);
  assert.match(styles, /\.blog-grid\.has-five-results \.last-visible-result/);
  assert.match(styles, /@media \(min-width:761px\) and \(max-width:1160px\)[\s\S]*?\.blog-grid\.has-three-results \.last-visible-result/);
  assert.match(styles, /@media \(max-width:760px\)[\s\S]*?\.blog-grid\.has-one-result,[\s\S]*?grid-template-columns:minmax\(0,1fr\)/);
});

test('Whitespace, About balance, Contact wrapping and responsive typography follow the new content-led scale', () => {
  const styles = readSource('frontend/src/styles.css');
  const marketing = readSource('frontend/src/marketing.js');
  assert.match(styles, /\.section \{ padding-block:clamp\(44px,4vw,64px\); \}/);
  assert.match(styles, /\.services-section \{ padding-block:56px 40px; \}/);
  assert.match(styles, /\.blog-directory \{ padding-block:40px 52px; \}/);
  assert.match(styles, /--type-body:17px/);
  assert.match(styles, /--type-h1:clamp\(32px,/);
  assert.match(styles, /--type-h2:clamp\(24px,/);
  assert.match(styles, /--type-h3:clamp\(24px,/);
  assert.match(styles, /--type-editorial:clamp\(18px,[^,]+,20px\)/);
  assert.match(styles, /\.page-about \.story-grid\s*\{[\s\S]*?grid-template-columns:minmax\(0,1fr\) minmax\(0,1fr\)/);
  assert.match(marketing, /class="section about-story-section"/);
  assert.match(marketing, /Team image.\./);
  assert.match(styles, /@media \(max-width:1180px\)\s*\{\s*\.page-contact \.contact-layout \{ grid-template-columns:minmax\(0,1fr\)/s);
  assert.match(styles, /@media \(max-width:760px\)[\s\S]*?\.page-contact \.contact-aside \{ grid-template-columns:minmax\(0,1fr\)/);
});

test('Dark mode keeps Home trust marks, the primary CTA, and About credentials readable', () => {
  const styles = readSource('frontend/src/styles.css');
  assert.match(styles, /:root\[data-theme="dark"\] \.trust-strip\s*\{[^}]*background:var\(--surface-2\)/s);
  assert.match(styles, /:root\[data-theme="dark"\] \.trust-logos > span\s*\{ opacity:1; \}/);
  assert.match(styles, /:root\[data-theme="dark"\] \.cta-band\s*\{[^}]*background:var\(--forest-deep\)/s);
  assert.match(styles, /:root\[data-theme="dark"\] \.cta-inner h2 em\s*\{ color:#b8d7bf; \}/);
  assert.match(styles, /:root\[data-theme="dark"\] \.certification-section\s*\{[^}]*background:var\(--surface-2\)/s);
  assert.match(styles, /:root\[data-theme="dark"\] \.certification-list > span,\s*:root\[data-theme="dark"\] \.certification-list small \{ color:var\(--ink-2\); \}/);
});

test('Orphan Service and featured Blog cards fill their final rows at each desktop grid width', () => {
  const main = readSource('frontend/src/main.js');
  const styles = readSource('frontend/src/styles.css');
  assert.match(main, /has-orphan-three-column-row', count > 3 && count % 3 === 1/);
  assert.match(main, /has-orphan-two-column-row', count > 2 && count % 2 === 1/);
  assert.match(main, /for \(const count of \[1, 2, 3, 4, 5, 6\]\)/);
  assert.match(main, /has-featured-six-results/);
  assert.match(styles, /#services-grid\.has-orphan-three-column-row \.last-visible-result\s*\{[^}]*grid-column:1 \/ -1/s);
  assert.match(styles, /#services-grid\.has-orphan-two-column-row \.last-visible-result\s*\{[^}]*grid-column:1 \/ -1/s);
  assert.match(styles, /\.blog-grid\.has-featured-six-results > \.blog-card:not\(\.blog-card-featured\)\.balanced-final-row\s*\{\s*grid-column:span 3;\s*\}/);
  assert.match(styles, /\.blog-grid\.has-featured-six-results \.last-visible-result\s*\{[^}]*grid-column:1 \/ -1/s);
  assert.match(styles, /Contact keeps the form and supporting information in one content-led vertical flow at every width\.\s*\*\/\s*\.contact-page \.contact-layout \{\s*grid-template-columns:minmax\(0,1fr\)/s);
  assert.match(styles, /@media \(max-width:760px\)\s*\{\s*\.contact-page \.contact-aside \{ grid-template-columns:minmax\(0,1fr\); \}/s);
});

test('One Northline sans-serif stack is used for site text, accents and form controls', () => {
  const styles = readSource('frontend/src/styles.css');
  assert.match(styles, /--font:\s*Inter, ui-sans-serif, system-ui/);
  assert.match(styles, /button,input,select,textarea,table,code,pre \{ font-family:var\(--font\); \}/);
  assert.match(styles, /app-shell \.app-content form label:not\(\.sr-only\) \{ font-size:14px!important; \}/);
  assert.match(styles, /app-shell \.app-content form select,\s*\.app-shell \.app-content form textarea \{ font-size:16px!important; \}/);
  assert.match(styles, /\.section-heading h2 em,h1 em,h2 em,[\s\S]*?\.auth-quote p \{ font-family:var\(--font\); \}/);
  assert.doesNotMatch(styles, /font-family\s*:\s*(?:Georgia|Times New Roman|serif)/i);
  assert.match(styles, /--type-body:17px/);
  assert.match(styles, /--type-editorial:clamp\(18px,[^,]+,20px\)/);
  assert.match(styles, /--type-h1:clamp\(32px,/);
  assert.match(styles, /--type-h2:clamp\(24px,/);
  assert.match(styles, /--type-h3:clamp\(24px,/);
  assert.match(styles, /--type-label:14px/);
  assert.match(styles, /--type-caption:12px/);
});
