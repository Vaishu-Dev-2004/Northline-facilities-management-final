import { brandIcon, icon, logo } from './icons.js';
import { services, testimonials } from './demoData.js';
import { getDirection, t } from './i18n.js';
import { siteConfig } from './siteConfig.js';

export function button(label, href = '#/contact', kind = 'primary', extra = '') {
  return `<a class="btn btn-${kind} ${extra}" href="${href}">${label}${kind === 'primary' ? icon('arrow', 16) : ''}</a>`;
}

function socialLinkMarkup(social, className = '') {
  return `<a class="social-link social-${social.icon} ${className}" href="${social.href}" target="_blank" rel="noopener noreferrer" aria-label="${social.name} profile for Northline" title="Visit the Northline ${social.name} profile">${brandIcon(social.icon, 17)}</a>`;
}

export function publicHeader(active = '', route = '') {
  return `<header class="site-header" id="site-header">
    <div class="container nav-wrap">
      ${logo()}
      <button class="icon-button mobile-menu-toggle" type="button" data-action="toggle-public-menu" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav">${icon('menu', 21)}</button>
      <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
        <div class="nav-item has-dropdown home-menu">
          <button class="nav-link home-menu-trigger ${active === 'home' ? 'is-active' : ''}" type="button" data-action="toggle-home-dropdown" aria-expanded="false" aria-controls="home-version-menu">Home <span class="nav-caret">${icon('chevronDown', 13)}</span></button>
          <div class="nav-dropdown home-version-dropdown" id="home-version-menu" role="group" aria-label="Home page options">
            <div class="home-version-links">
              <a class="home-version-option" href="#/" ${route === '/' || route === '/home' ? 'aria-current="page"' : ''}><span class="home-version-icon">${icon('building', 18)}</span><span><strong>Integrated Facilities Management</strong><small>Reliable services and site-wide care</small></span></a>
              <a class="home-version-option" href="#/smart" ${route === '/smart' ? 'aria-current="page"' : ''}><span class="home-version-icon">${icon('activity', 18)}</span><span><strong>Smart Facilities Management</strong><small>Connected systems and predictive insight</small></span></a>
            </div>
          </div>
        </div>
        <a href="#/services" class="nav-link ${active === 'services' ? 'is-active' : ''}">${t('nav.services')}</a>
        <a href="#/about" class="nav-link ${active === 'about' ? 'is-active' : ''}">${t('nav.about')}</a>
        <a href="#/industries" class="nav-link ${active === 'industries' ? 'is-active' : ''}">${t('nav.industries')}</a>
        <a href="#/blog" class="nav-link ${active === 'blog' ? 'is-active' : ''}">${t('nav.insights')}</a>
        <a href="#/pricing" class="nav-link ${active === 'pricing' ? 'is-active' : ''}">${t('nav.pricing')}</a>
        <a href="#/contact" class="nav-link ${active === 'contact' ? 'is-active' : ''}">${t('nav.contact')}</a>
        <a href="#/client/dashboard" class="nav-link nav-dashboard-link" title="Open the client workspace">${t('nav.dashboard')}</a>
        <a href="#/login" class="nav-link nav-login-button">${t('nav.login')}</a>
        <div class="mobile-nav-actions" role="group" aria-label="Appearance and service actions">
          <div class="mobile-nav-control-row">
            <div class="direction-control" role="group" aria-label="Text direction">
              <button type="button" data-action="set-direction" data-direction="ltr" aria-label="Set text direction left to right" aria-pressed="${getDirection() === 'ltr'}">LTR</button>
              <button type="button" data-action="set-direction" data-direction="rtl" aria-label="Set text direction right to left" aria-pressed="${getDirection() === 'rtl'}">RTL</button>
            </div>
            <button class="icon-button theme-toggle" type="button" data-action="toggle-theme" aria-label="Toggle color theme">${icon('moon', 17)}</button>
          </div>
          <a class="btn btn-primary btn-small mobile-nav-request" href="#/contact">${t('nav.request')}${icon('arrow', 15)}</a>
        </div>
      </nav>
      <div class="nav-actions">
        <div class="direction-control" role="group" aria-label="Text direction">
          <button type="button" data-action="set-direction" data-direction="ltr" aria-label="Set text direction left to right" aria-pressed="${getDirection() === 'ltr'}">LTR</button>
          <button type="button" data-action="set-direction" data-direction="rtl" aria-label="Set text direction right to left" aria-pressed="${getDirection() === 'rtl'}">RTL</button>
        </div>
        <button class="icon-button theme-toggle" type="button" data-action="toggle-theme" aria-label="Toggle color theme">${icon('moon', 17)}</button>
        <a class="btn btn-primary btn-small nav-request" href="#/contact" aria-label="${t('nav.request')}" title="${t('nav.request')}"><span class="nav-request-label-full">${t('nav.request')}</span><span class="nav-request-label-compact" aria-hidden="true">Request service</span><span class="nav-request-label-tiny" aria-hidden="true">Request</span>${icon('arrow', 15)}</a>
      </div>
    </div>
  </header>`;
}

export function footer() {
  return `<footer class="site-footer">
    <div class="container footer-main">
      <div class="footer-brand">${logo()}<p>Integrated facilities management for Indian workplaces, campuses, healthcare and industrial sites—delivered with dependable people, clear processes and useful technology.</p><div class="footer-social" role="group" aria-label="Northline social profile links">${siteConfig.socialLinks.map((social) => socialLinkMarkup(social)).join('')}</div></div>
      <div class="footer-col"><h3>Explore</h3><a href="#/about">About Northline</a><a href="#/industries">Industries</a><a href="#/blog">Blog</a><a href="#/pricing">Service plans</a><a href="#/contact">Contact our team</a></div>
      <div class="footer-col"><h3>What we do</h3><a href="#/services">Integrated facilities management</a><a href="#/smart">Smart facilities management</a><a href="#/services">Technical & building maintenance</a><a href="#/services">Cleaning & workplace services</a><a href="#/services">Energy & sustainability</a><a href="#/services">Emergency maintenance</a></div>
      <div class="footer-col footer-contact"><h3>Talk to our team</h3><a href="tel:${siteConfig.phoneHref}">${icon('phone', 15)} ${siteConfig.phone}</a><a href="mailto:${siteConfig.email}">${icon('mail', 15)} ${siteConfig.email}</a><p>${icon('map', 15)} ${siteConfig.officeLabel}<br/><span>${siteConfig.addressLine}, ${siteConfig.city}, ${siteConfig.region} ${siteConfig.postalCode}, India</span></p><span class="footer-hours">${siteConfig.emergencyHours} · ${siteConfig.timezone}</span></div>
    </div>
    <div class="container footer-bottom"><span>© 2026 ${siteConfig.name} India. All rights reserved.</span><div><a href="#/privacy">Privacy</a><a href="#/terms">Terms</a><a href="#/cookies">Cookie settings</a></div><span class="footer-illustrative-disclosure">: company, contact, client, team, testimonial and service details are placeholders. Verify them before publication.</span></div>
  </footer>`;
}

export function serviceCard(service, index = 0) {
  const route = `#/services/${service.slug}`;
  const search = `${service.name} ${service.category} ${service.description}`.toLowerCase().replace(/[&<>"']/g, ' ');
  return `<article class="service-card reveal" data-service-card data-category="${service.category.toLowerCase()}" data-search="${search}" style="--delay:${(index % 4) * 65}ms">
    <figure class="service-card-media"><img src="${service.image}" alt="${service.imageAlt}" width="960" height="600" loading="lazy" decoding="async"/><span class="service-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span></figure>
    <div class="service-card-content"><div class="service-card-top"><span class="service-icon" aria-hidden="true">${icon(service.icon, 22)}</span><span class="service-card-category">${service.category}</span></div><h3>${service.name}</h3><p class="image-card-summary">${service.cardExcerpt || service.description}</p><a href="${route}" class="text-link">Explore service ${icon('arrow', 15)}</a></div>
  </article>`;
}
export function statusBadge(value) {
  const safe = String(value || '—').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const slug = safe.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `<span class="status-badge status-${slug}"><i aria-hidden="true"></i>${safe}</span>`;
}

export function avatar(name, cls = '') {
  const initials = String(name || 'NL').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  return `<span class="avatar ${cls}" aria-hidden="true">${initials}</span>`;
}

export function sectionHeading(kicker, title, body = '', align = '') {
  return `<div class="section-heading ${align}"><span class="eyebrow"><span class="eyebrow-line"></span>${kicker}</span><h2>${title}</h2>${body ? `<p>${body}</p>` : ''}</div>`;
}

export function testimonialCard(item, index = 0) {
  return `<article class="testimonial-card ${index === 0 ? 'testimonial-featured' : ''}"><div class="rating" aria-label="Illustrative five-star rating;testimonial">${icon('star', 15)}${icon('star', 15)}${icon('star', 15)}${icon('star', 15)}${icon('star', 15)}</div><blockquote>“${item.quote}”</blockquote><div class="testimonial-person">${avatar(item.name, 'avatar-soft')}<div><strong>${item.name}</strong><span>${item.role}</span><small>${item.company}</small></div><span class="quote-mark" aria-hidden="true">“</span></div></article>`;
}
