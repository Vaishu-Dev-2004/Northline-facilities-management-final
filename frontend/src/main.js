import './styles.css';
import { renderPublic } from './marketing.js';
import { getWorkspaceNotifications, renderAdmin, renderClient, renderTechnician } from './dashboards.js';
import { icon } from './icons.js';
import { avatar, statusBadge } from './components.js';
import { addRecord, getStore, markAllRead, updateRecord, updateWorkOrder } from './store.js';
import { blogPosts, services } from './demoData.js';
import { applyDirection, applyLocale, getLocale } from './i18n.js';
import { siteConfig } from './siteConfig.js';
import { scopeExportRecords } from './exportScope.js';

const app = document.querySelector('#app');
const toastRegion = document.querySelector('#toast-region');
let toastTimer;
let selectedMessageId = '';
let modalReturnFocus = null;
let themePreference = localStorage.getItem('northline.theme') || 'light';

function normalizeRoute(value) {
  const path = String(value || '/').split(/[?#]/, 1)[0] || '/';
  try { return decodeURI(path).replace(/\/+$/, '') || '/'; } catch { return path || '/'; }
}

function currentRoute() {
  const hash = window.location.hash;
  if (hash.startsWith('#/')) return normalizeRoute(hash.slice(1));
  return normalizeRoute(window.location.pathname || '/');
}

function applyTheme(preference = themePreference) {
  themePreference = ['light','dark','system'].includes(preference) ? preference : 'light';
  localStorage.setItem('northline.theme', themePreference);
  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const resolved = themePreference === 'system' ? (systemDark ? 'dark' : 'light') : themePreference;
  document.documentElement.dataset.theme = resolved;
  document.querySelectorAll('.theme-toggle').forEach((button) => {
    const nextTheme = resolved === 'dark' ? 'light' : 'dark';
    button.innerHTML = `${icon(resolved === 'dark' ? 'sun' : 'moon', 17)}${button.classList.contains('sidebar-tool-button') ? '<span>Theme</span>' : ''}`;
    button.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    button.title = `Switch to ${nextTheme} theme`;
    button.dataset.currentTheme = resolved;
  });
  document.querySelectorAll('.theme-choice').forEach((button) => {
    const selected = button.dataset.themeValue === themePreference;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function updateBillingPrices(frequency = 'monthly') {
  const billing = frequency === 'annual' ? 'annual' : 'monthly';
  const annual = billing === 'annual';
  document.querySelectorAll('[data-monthly-price][data-annual-price]').forEach((price) => {
    const amount = annual ? price.dataset.annualPrice : price.dataset.monthlyPrice;
    price.textContent = amount;
    const period = document.createElement('span');
    period.className = 'price-period';
    period.textContent = annual ? '/year' : '/month';
    price.append(period);
    price.setAttribute('aria-label', `${amount} per ${annual ? 'year' : 'month'}`);
    price.dataset.billingFrequency = billing;
  });
  document.querySelectorAll('[data-billing]').forEach((button) => {
    const selected = button.dataset.billing === billing;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  const status = document.querySelector('[data-billing-status]');
  if (status) status.textContent = annual
    ? 'Annual prices shown. Each annual price equals twelve monthly payments; no discount is applied.'
    : 'Monthly prices shown. Annual prices equal twelve monthly payments; no discount is applied.';
}

function structuredDataFor(page, route) {
  const base = siteConfig.origin;
  const brand = { '@type': 'Organization', '@id': `${base}/#organization`, name: siteConfig.name, description: 'Illustrative Indian facilities-management brand; verify business details before publication.', url: `${base}/`, logo: `${base}/favicon.svg` };
  const graph = [brand];

  if (route !== '/') {
    const pieces = route.split('/').filter(Boolean);
    const crumbNames = { about: 'About', services: 'Services', industries: 'Industries', blog: 'Insights', pricing: 'Service plans', contact: 'Contact', 'facility-maintenance': 'Facility maintenance' };
    const items = [{ name: 'Home', item: `${base}/` }];
    let path = '';
    for (const piece of pieces) {
      path += `/${piece}`;
      const post = piece && blogPosts.find((item) => item.slug === piece);
      const service = piece && services.find((item) => item.slug === piece);
      items.push({ name: post?.title || service?.name || crumbNames[piece] || piece.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()), item: `${base}${path}` });
    }
    graph.push({ '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.item })) });
  }
  if (route.startsWith('/services/')) {
    const service = services.find((item) => item.slug === route.split('/').pop()) || services[0];
    graph.push({ '@type': 'Service', name: service.name, serviceType: service.category, description: service.detail, provider: brand, areaServed: siteConfig.serviceRegion.split(' · '), url: `${base}${route}` });
    graph.push({ '@type': 'FAQPage', mainEntity: [
      [`What does ${service.name.toLowerCase()} include?`, `The proposed ${service.name.toLowerCase()} scope is tailored to the property, critical assets, operating hours and agreed service levels.`],
      ['How is service scheduled across Indian sites?','Visits are planned with the site contact around occupancy, local operating hours and access requirements.'],
      ['Can the service work with existing vendors and systems?','Yes. The delivery plan can include approved client-appointed specialists and existing building systems, subject to clear responsibilities and access controls.']
    ].map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) });
  }
  if (route.startsWith('/blog/')) {
    const post = blogPosts.find((item) => item.slug === route.split('/').pop());
    if (post) graph.push({ '@type': 'Article', headline: post.title, description: post.excerpt, datePublished: Number.isNaN(new Date(post.date).getTime()) ? '2026-01-01' : new Date(post.date).toISOString().slice(0,10), author: { '@type': 'Person', name: post.author }, publisher: brand, image: `${base}${post.image}`, mainEntityOfPage: `${base}${route}` });
  }
  if (route === '/pricing') {
    graph.push({ '@type': 'FAQPage', mainEntity: [
      ['How do you build a service quote?','We review the property, systems, operating hours and response requirements, then define scope and assumptions clearly.'],
      ['Can we combine services across a portfolio?','Northline can coordinate technical, maintenance and workplace services across locations with local plans and shared operating visibility.'],
      ['Do you require a long-term contract?','Contract terms depend on scope and mobilisation. Commitment, service levels and exit provisions are explained before a decision.'],
      ['Can our plan change over time?','Regular service reviews provide a place to adjust priorities, property coverage and reporting as needs change.']
    ].map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function pageMeta(page, route) {
  const baseTitle = page.title || 'Northline Facilities';
  document.title = baseTitle;
  let description = document.querySelector('meta[name="description"]');
  if (!description) { description = document.createElement('meta'); description.name = 'description'; document.head.append(description); }
  description.content = `${page.description || 'Northline Facilities management workspace.'} ; business details require verification before publication.`;
  const pageUrl = `${siteConfig.origin}${route === '/' ? '/' : route}`;
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = pageUrl;
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', pageUrl);
  const noIndex = route.startsWith('/admin') || route.startsWith('/client') || route.startsWith('/technician') || ['/login','/register','/forgot-password','/maintenance'].includes(route);
  const robots = document.querySelector('meta[name="robots"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'robots' }));
  robots.content = noIndex ? 'noindex,nofollow' : 'index,follow';
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description.content);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description.content);
  const schema = document.querySelector('#structured-data');
  if (schema) schema.textContent = JSON.stringify(structuredDataFor(page, route));
}

function render() {
  const route = currentRoute();
  applyLocale(getLocale());
  let page;
  if (route.startsWith('/admin')) page = renderAdmin(route);
  else if (route.startsWith('/client')) page = renderClient(route);
  else if (route.startsWith('/technician')) page = renderTechnician(route);
  else page = renderPublic(route);
  app.innerHTML = page.html;
  if (route === '/pricing') updateBillingPrices(document.querySelector('[data-billing].active')?.dataset.billing || 'monthly');
  const homeMenu = document.querySelector('.home-menu');
  if (homeMenu) {
    homeMenu.addEventListener('pointerenter', (event) => { if (event.pointerType !== 'mouse') return; homeMenu.classList.remove('escape-dismissed'); setHomeDropdownState(homeMenu, true); });
    homeMenu.addEventListener('pointerleave', (event) => { if (event.pointerType !== 'mouse') return; if (!homeMenu.contains(document.activeElement)) setHomeDropdownState(homeMenu, false); });
    homeMenu.addEventListener('focusin', (event) => { if (event.target.closest('a')) setHomeDropdownState(homeMenu, true); });
    homeMenu.addEventListener('focusout', () => window.setTimeout(() => { if (!homeMenu.contains(document.activeElement) && !homeMenu.matches(':hover')) setHomeDropdownState(homeMenu, false); }, 0));
  }
  if (route === '/admin/settings') {
    try {
      const saved = JSON.parse(localStorage.getItem('northline.workspaceSettings') || 'null');
      if (saved) {
        document.querySelectorAll('.settings-form-grid input,.settings-form-grid textarea,.settings-form-grid select').forEach((field, index) => { if (saved.fields?.[index] !== undefined) field.value = saved.fields[index]; });
        document.querySelectorAll('.settings-toggle-row input[type="checkbox"]').forEach((field, index) => { if (saved.notifications?.[index] !== undefined) field.checked = saved.notifications[index]; });
      }
    } catch { /* Ignore incomplete sample preferences. */ }
  }
  pageMeta(page, route);
  applyTheme();
  const workspaceKind = route.startsWith('/client') ? 'client' : route.startsWith('/technician') ? 'technician' : 'admin';
  const unreadNotifications = getWorkspaceNotifications(workspaceKind, getStore()).filter((notification) => notification.unread).length;
  document.querySelectorAll('.notification-button').forEach((button) => {
    button.setAttribute('aria-label', unreadNotifications ? `Notifications, ${unreadNotifications} unread` : 'Notifications');
    const indicator = button.querySelector('i');
    if (indicator) indicator.style.display = unreadNotifications ? '' : 'none';
  });
  document.querySelectorAll('.site-header').forEach((header) => header.classList.toggle('scrolled', window.scrollY > 10));
  applyCalendar();
  applyDataFilters();
  applyServiceFilters();
  applyBlogFilters();
  applyMessageSelection(selectedMessageId);
  applyMessageFilters();
}

function toast(message, type = 'success') {
  const node = document.createElement('div');
  node.className = `toast ${type}`;
  node.innerHTML = `${icon(type === 'error' ? 'warning' : type === 'info' ? 'activity' : 'checkCircle', 17)}<span></span>`;
  node.querySelector('span').textContent = message;
  toastRegion.append(node);
  window.setTimeout(() => node.remove(), 3800);
}

function mountDialog(element, focusSelector) {
  if (!modalReturnFocus) modalReturnFocus = document.activeElement;
  document.body.append(element);
  document.body.classList.add('has-modal');
  const dialog = element.querySelector('[role="dialog"]');
  const target = (focusSelector && dialog?.querySelector(focusSelector))
    || dialog?.querySelector('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href]');
  if (target) target.focus();
  else if (dialog) { dialog.tabIndex = -1; dialog.focus(); }
}

function closeModal() {
  const hadDialog = Boolean(document.querySelector('.modal-backdrop [role="dialog"],.cookie-consent-modal [role="dialog"]'));
  document.querySelectorAll('.modal-backdrop,.cookie-consent-modal,.profile-popover,.row-menu-popover').forEach((el) => el.remove());
  document.body.classList.remove('has-modal');
  if (hadDialog) {
    const target = modalReturnFocus;
    modalReturnFocus = null;
    if (target?.isConnected && !target.disabled) target.focus();
  }
}

function safeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

const createDefinitions = {
  'work-order': { title: 'Create work order', description: 'Capture the issue and we’ll route it to the right team.', fields: (db) => [
    { name: 'title', label: 'Request title', type: 'text', placeholder: 'e.g. Cooling unit making an unusual sound', required: true },
    { name: 'property', label: 'Property', type: 'select', required: true, options: db.properties.filter((p) => !currentRoute().startsWith('/client') || p.client === 'Meridian Workspaces').map((p) => p.name) },
    { name: 'category', label: 'Service category', type: 'select', required: true, options: ['Maintenance','HVAC','Electrical','Plumbing','Cleaning','Security','Inspection','Controls','Life safety','Grounds','Mechanical','Preventive'] },
    { name: 'priority', label: 'Priority', type: 'select', required: true, options: ['Low','Medium','High','Critical'] },
    { name: 'location', label: 'Location in property', type: 'text', placeholder: 'Floor, room or asset' },
    { name: 'description', label: 'What needs attention?', type: 'textarea', placeholder: 'Include useful context, access notes or when the issue started…', required: true, wide: true },
    { name: 'attachment', label: 'Photo or document (optional, PDF/JPG/PNG up to 10 MB)', type: 'file', wide: true }
  ] },
  user: { title: 'Invite a user', description: 'Add a team member or client to the workspace.', fields: () => [
    { name: 'name', label: 'Full name', type: 'text', required: true }, { name: 'email', label: 'Email address', type: 'email', required: true },
    { name: 'role', label: 'Role', type: 'select', required: true, options: ['Admin','Manager','Technician','Client'] }, { name: 'company', label: 'Company', type: 'text', required: true }
  ] },
  client: { title: 'Add a client', description: 'Create a client record for a new service relationship.', fields: () => [
    { name: 'name', label: 'Company name', type: 'text', required: true }, { name: 'contact', label: 'Primary contact', type: 'text', required: true }, { name: 'email', label: 'Contact email', type: 'email', required: true }, { name: 'contract', label: 'Service plan', type: 'select', options: ['Essential','Professional','Enterprise'] }
  ] },
  property: { title: 'Add a property', description: 'Create a property record and assign an operating contact.', fields: (db) => [
    { name: 'name', label: 'Property name', type: 'text', required: true }, { name: 'type', label: 'Property type', type: 'select', options: ['Corporate office','Healthcare','Residential','Education','Retail','Hospitality','Manufacturing','Warehouse','Laboratory','Cultural'] }, { name: 'client', label: 'Client', type: 'select', options: db.clients.map((c) => c.name) }, { name: 'address', label: 'Address', type: 'text', required: true }, { name: 'area', label: 'Facility size', type: 'text', placeholder: 'e.g. 84,000 sq ft' }, { name: 'manager', label: 'Assigned manager', type: 'text' }
  ] },
  technician: { title: 'Add a technician', description: 'Create a field-team profile and record their skills.', fields: () => [
    { name: 'name', label: 'Full name', type: 'text', required: true }, { name: 'email', label: 'Work email', type: 'email', required: true }, { name: 'skills', label: 'Primary skills', type: 'text', placeholder: 'HVAC · Controls' }, { name: 'company', label: 'Team', type: 'text', placeholder: 'Northline Facilities' }
  ] },
  schedule: { title: 'Schedule maintenance', description: 'Add a recurring or one-time preventive task.', fields: (db) => [
    { name: 'title', label: 'Maintenance task', type: 'text', required: true }, { name: 'property', label: 'Property', type: 'select', options: db.properties.map((p) => p.name) }, { name: 'service', label: 'Service type', type: 'select', options: ['HVAC','Electrical','Plumbing','Life safety','Controls','Cleaning','Mechanical'] }, { name: 'technician', label: 'Technician', type: 'select', options: db.technicians.map((t) => t.name) }, { name: 'due', label: 'Next due date', type: 'date', required: true }, { name: 'recurrence', label: 'Recurrence', type: 'select', options: ['Daily','Weekly','Monthly','Quarterly','Yearly','Custom'] }
  ] },
  service: { title: 'Add a service', description: 'Add a service to the Northline catalogue.', fields: () => [
    { name: 'name', label: 'Service name', type: 'text', required: true }, { name: 'category', label: 'Category', type: 'select', options: ['Maintenance','Cleaning','Security','Technical services','Energy','Emergency services'] }, { name: 'description', label: 'Description', type: 'textarea', required: true, wide: true }
  ] },
  invoice: { title: 'Create invoice', description: 'Create a draft invoice for review. Payment processing is not enabled in this sample.', fields: (db) => [
    { name: 'client', label: 'Client', type: 'select', options: db.clients.map((c) => c.name) }, { name: 'property', label: 'Property', type: 'select', options: db.properties.map((p) => p.name) }, { name: 'amount', label: 'Amount (INR)', type: 'number', min: '0', required: true }, { name: 'due', label: 'Due date', type: 'date', required: true }
  ] },
  message: { title: 'Compose message', description: 'Create a message for the service conversation.', fields: (db) => [
    { name: 'subject', label: 'Subject', type: 'text', required: true }, { name: 'body', label: 'Message', type: 'textarea', required: true, wide: true }
  ] },
  post: { title: 'New field note', description: 'Create a draft article in the content workspace.', fields: () => [
    { name: 'title', label: 'Article title', type: 'text', required: true, wide: true }, { name: 'category', label: 'Category', type: 'select', options: ['Facility management','Maintenance','Workplace safety','Sustainability','Technology','Industry insights'] }, { name: 'author', label: 'Author', type: 'text', required: true }, { name: 'excerpt', label: 'Summary', type: 'textarea', required: true, wide: true }
  ] }
};

function fieldMarkup(field) {
  const required = field.required ? 'required' : '';
  const wide = field.wide ? ' class="modal-field-wide"' : '';
  if (field.type === 'select') return `<label${wide}>${safeText(field.label)}<select name="${safeText(field.name)}" ${required}><option value="">Choose…</option>${(field.options || []).map((item) => `<option value="${safeText(item)}">${safeText(item)}</option>`).join('')}</select></label>`;
  if (field.type === 'textarea') return `<label${wide}>${safeText(field.label)}<textarea name="${safeText(field.name)}" rows="3" ${required} placeholder="${safeText(field.placeholder || '')}"></textarea></label>`;
  if (field.type === 'file') return `<label${wide}>${safeText(field.label)}<input name="${safeText(field.name)}" type="file" accept=".pdf,.png,.jpg,.jpeg"/></label>`;
  return `<label${wide}>${safeText(field.label)}<input name="${safeText(field.name)}" type="${safeText(field.type || 'text')}" ${required} ${field.min !== undefined ? `min="${safeText(field.min)}"` : ''} placeholder="${safeText(field.placeholder || '')}"/></label>`;
}

function openCreateDialog(entity) {
  const def = createDefinitions[entity];
  if (!def) { toast('This action is not available in the workspace preview.', 'info'); return; }
  const fields = def.fields(getStore());
  const rows = [];
  for (let i = 0; i < fields.length; i += 2) rows.push(fields.slice(i, i + 2));
  const body = rows.map((pair) => `<div class="modal-row">${pair.map(fieldMarkup).join('')}</div>`).join('');
  const element = document.createElement('div');
  element.className = 'modal-backdrop';
  element.innerHTML = `<section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><div><h2 id="modal-title">${safeText(def.title)}</h2><p>${safeText(def.description)}</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Close dialog">${icon('close',18)}</button></div><form data-form="create-record" data-entity="${safeText(entity)}"><div class="modal-body">${body}<div class="form-feedback" aria-live="polite"></div></div><div class="modal-footer"><button type="button" class="btn btn-outline btn-small" data-action="close-modal">Cancel</button><button type="submit" class="btn btn-primary btn-small">${entity === 'work-order' ? 'Create request' : 'Save record'} ${icon('arrow',14)}</button></div></form></section>`;
  mountDialog(element, 'input:not([type="file"]):not([disabled]),select:not([disabled]),textarea:not([disabled])');
  element.addEventListener('click', (event) => { if (event.target === element) closeModal(); });
}

function openCookieSettings() {
  const current = JSON.parse(localStorage.getItem('northline.cookies') || '{}');
  const modal = document.createElement('div');
  modal.className = 'cookie-consent-modal';
  modal.innerHTML = `<section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="cookie-title"><div class="dialog-head"><div><h2 id="cookie-title">Privacy preferences</h2><p>These category choices are saved locally. No optional tracking providers are connected.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close preferences">${icon('close',17)}</button></div><div class="dialog-options"><div class="dialog-option"><span><strong>Required</strong><small>Core interface preferences are stored locally in this browser.</small></span><input type="checkbox" checked disabled aria-label="Required preferences stay active"/></div>${[['analytics','Analytics','No analytics provider is installed.'],['preferences','Preferences','This saves a local choice only; theme and language controls remain in this browser.'],['marketing','Marketing','No marketing tags or audience tracking are enabled.']].map(([key,label,copy])=>`<label class="dialog-option"><span><strong>${label}</strong><small>${copy}</small></span><input type="checkbox" data-cookie-choice="${key}" ${current[key]?'checked':''}/></label>`).join('')}</div><div class="dialog-actions"><button class="btn btn-outline btn-small" data-action="cookie-reject">Reject optional</button><button class="btn btn-primary btn-small" data-action="cookie-save">Save choices</button></div></section>`;
  mountDialog(modal, '[data-cookie-choice]');
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
}

function openRowMenu(button) {
  document.querySelector('.row-menu-popover')?.remove();
  const row = button.closest('tr');
  const id = button.dataset.rowId;
  const route = currentRoute();
  const db = getStore();
  let collection = 'workOrders';
  let record = db.workOrders.find((item) => item.id === id);
  let actions = [];
  const workOrderTable = route.startsWith('/admin/work-orders') || route === '/admin/orders' || route === '/client/work-orders' || route === '/client/orders';
  if (workOrderTable) {
    actions.push(`<button data-action="view-row" data-collection="workOrders" data-row-id="${safeText(id)}">${icon('eye',14)} View details</button>`);
    if (route.startsWith('/admin') && record) {
      const nextStage = { 'New':'Pending Review','Assigned':'Dispatched','Dispatched':'In Progress','On Hold':'In Progress','Waiting for Parts':'In Progress','Completed':'Client Approval' }[record.status];
      if (nextStage) actions.push(`<button data-action="row-set-status" data-collection="workOrders" data-status="${safeText(nextStage)}" data-row-id="${safeText(id)}">${icon(nextStage === 'Closed' ? 'checkCircle' : 'activity',14)} ${nextStage === 'Closed' ? 'Close after client review' : `Move to ${nextStage}`}</button>`);
      if (['Pending Review','Assigned'].includes(record.status)) actions.push(`<button data-action="assign-work-order" data-row-id="${safeText(id)}">${icon('users',14)} ${record.assignee && record.assignee !== 'Unassigned' ? 'Reassign technician' : 'Assign technician'}</button>`);
      if (['New','Pending Review','Assigned','Dispatched','In Progress','Waiting for Parts'].includes(record.status)) actions.push(`<button data-action="row-set-status" data-collection="workOrders" data-status="On Hold" data-row-id="${safeText(id)}">${icon('clock',14)} Place on hold</button>`);
    } else if (record?.status === 'New') {
      actions.push(`<button data-action="row-set-status" data-collection="workOrders" data-status="Cancelled" data-row-id="${safeText(id)}">${icon('close',14)} Cancel request</button>`);
    } else if (record?.status === 'Client Approval') {
      actions.push(`<button data-action="row-set-status" data-collection="workOrders" data-status="Closed" data-row-id="${safeText(id)}">${icon('checkCircle',14)} Approve & close request</button>`);
    }
  } else {
    const config = {
      '/admin/users': ['users', 'Access'],
      '/admin/clients': ['clients', 'Client'],
      '/admin/properties': ['properties', 'Property'],
      '/admin/technicians': ['technicians', 'Technician'],
      '/admin/maintenance': ['schedules', 'Maintenance'],
      '/admin/services': ['services', 'Service'],
      '/admin/invoices': ['invoices', 'Invoice'],
      '/admin/messages': ['messages', 'Message'],
      '/admin/notifications': ['notifications', 'Notification'],
      '/admin/blog': ['blogPosts', 'Article']
    }[route];
    if (config) {
      [collection] = config;
      record = db[collection]?.find((item) => item.id === id);
      actions.push(`<button data-action="view-row" data-collection="${collection}" data-row-id="${safeText(id)}">${icon('eye',14)} View ${config[1].toLowerCase()}</button>`);
      if (record) {
        let patch;
        let label;
        if (collection === 'users') { patch = { status: record.status === 'Active' ? 'Inactive' : 'Active' }; label = record.status === 'Active' ? 'Deactivate access' : 'Activate access'; }
        else if (collection === 'clients') { patch = { status: record.status === 'Active' ? 'Review' : 'Active' }; label = record.status === 'Active' ? 'Flag for review' : 'Reactivate client'; }
        else if (collection === 'properties') { patch = { status: record.status === 'Operational' ? 'Attention' : 'Operational' }; label = record.status === 'Operational' ? 'Flag for attention' : 'Mark operational'; }
        else if (collection === 'technicians') { patch = { status: record.status === 'Offline' ? 'Available' : 'Offline' }; label = record.status === 'Offline' ? 'Set available' : 'Set offline'; }
        else if (collection === 'schedules') { patch = { status: record.status === 'At risk' ? 'Scheduled' : 'At risk' }; label = record.status === 'At risk' ? 'Mark scheduled' : 'Flag at risk'; }
        else if (collection === 'services') { patch = { isPublished: !record.isPublished }; label = record.isPublished === false ? 'Publish service' : 'Unpublish service'; }
        else if (collection === 'invoices') { patch = { status: record.status === 'Paid' ? 'Pending' : 'Paid' }; label = record.status === 'Paid' ? 'Reopen invoice' : 'Mark paid'; }
        else if (collection === 'messages') { patch = { unread: !record.unread }; label = record.unread ? 'Mark as read' : 'Mark unread'; }
        else if (collection === 'notifications') { patch = { unread: !record.unread }; label = record.unread ? 'Mark as read' : 'Mark unread'; }
        else if (collection === 'blogPosts') { patch = { status: record.status === 'Published' ? 'Draft' : 'Published' }; label = record.status === 'Published' ? 'Move to draft' : 'Publish article'; }
        if (patch) actions.push(`<button data-action="update-record" data-collection="${collection}" data-patch="${safeText(JSON.stringify(patch))}" data-row-id="${safeText(id)}">${icon('edit',14)} ${label}</button>`);
      }
    }
  }
  const menu = document.createElement('div');
  menu.className = 'row-menu-popover';
  menu.innerHTML = actions.join('');
  document.body.append(menu);
  const rect = button.getBoundingClientRect();
  menu.style.top = `${Math.min(rect.bottom + 4, window.innerHeight - 180)}px`;
  menu.style.left = `${Math.max(10, Math.min(rect.left - 165, window.innerWidth - 190))}px`;
  if (!row || !actions.length) menu.remove();
}

function openCompletionDialog(id) {
  const order = getStore().workOrders.find((item) => item.id === id);
  if (!order || order.status !== 'In Progress') { toast('Start the assigned job before submitting its completion.', 'info'); return; }
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.innerHTML = `<section class="modal-card completion-dialog" role="dialog" aria-modal="true" aria-labelledby="completion-title"><div class="modal-header"><div><span class="page-kicker">FIELD WORK · ${safeText(order.id)}</span><h2 id="completion-title">Complete job</h2><p>${safeText(order.title)} · ${safeText(order.property)}</p></div><button class="icon-button" data-action="close-modal" aria-label="Close dialog">${icon('close',18)}</button></div><form data-form="complete-work-order" data-row-id="${safeText(order.id)}"><div class="modal-body"><label class="field-label" for="completion-note">Work completed and handover notes</label><textarea id="completion-note" name="completionNote" rows="5" minlength="12" maxlength="1200" required placeholder="Describe the work completed, test results and anything the facilities contact should know."></textarea><label class="field-label completion-evidence-label" for="completion-evidence">Optional evidence (PDF, PNG or JPG; up to 10 MB)</label><input id="completion-evidence" type="file" name="completionEvidence" accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"/><label class="completion-safety-check"><input type="checkbox" name="siteSafe" required/><span>I confirm the work area is safe, tools are cleared and the site handover is complete.</span></label><p class="form-feedback" aria-live="polite"></p><div class="illustrative-note">ILLUSTRATIVE RECORD · The evidence file is not uploaded or saved; only its filename may appear in this browser.</div></div><div class="modal-footer"><button type="button" class="btn btn-outline btn-small" data-action="close-modal">Cancel</button><button type="submit" class="btn btn-primary btn-small">Submit completion ${icon('checkCircle',14)}</button></div></form></section>`;
  mountDialog(modal, '#completion-note');
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
}

function openRowDetails(id, collection = 'workOrders') {
  const record = getStore()[collection]?.find((item) => item.id === id);
  if (!record) { toast('This record no longer exists.', 'info'); return; }
  const title = record.title || record.name || record.subject || record.reference || record.id;
  const detailEntries = Object.entries(record).filter(([key, value]) => !['id','description','excerpt','featured','completionNote','completionEvidenceName'].includes(key) && (typeof value !== 'object' || value === null)).slice(0, 12);
  const description = record.description || record.excerpt || record.body || '';
  const workOrderStages = ['New','Pending Review','Assigned','Dispatched','In Progress','Completed','Client Approval','Closed'];
  const stageIndex = workOrderStages.indexOf(record.status);
  const workflowMarkup = collection === 'workOrders' ? `<div class="work-order-flow" aria-label="Work order status timeline">${workOrderStages.map((stage,index)=>`<span class="work-order-flow-step ${index<stageIndex?'is-complete':''} ${index===stageIndex?'is-current':''}" ${index===stageIndex?'aria-current="step"':''}><i>${index<stageIndex?icon('check',10):index+1}</i><small>${safeText(stage)}</small></span>`).join('')}</div><div class="work-order-current-status">Current status: ${statusBadge(record.status)}</div>` : '';
  const nextStages = { 'New':'Pending Review','Assigned':'Dispatched','Dispatched':'In Progress','On Hold':'In Progress','Waiting for Parts':'In Progress','Completed':'Client Approval' };
  let footerAction = '';
  const route = currentRoute();
  if (collection === 'workOrders') {
    if (route.startsWith('/admin') && nextStages[record.status]) {
      const next = nextStages[record.status];
      footerAction = `<button class="btn btn-primary btn-small" data-action="row-set-status" data-collection="workOrders" data-row-id="${safeText(record.id)}" data-status="${safeText(next)}">Move to ${safeText(next)} ${icon('arrow',14)}</button>`;
    } else if (route.startsWith('/client') && record.status === 'Client Approval') {
      footerAction = `<button class="btn btn-primary btn-small" data-action="row-set-status" data-collection="workOrders" data-row-id="${safeText(record.id)}" data-status="Closed">Approve & close ${icon('checkCircle',14)}</button>`;
    } else if (route.startsWith('/technician')) {
      footerAction = record.status === 'In Progress' ? `<button class="btn btn-primary btn-small" data-action="open-completion" data-row-id="${safeText(record.id)}">Complete job ${icon('checkCircle',14)}</button>` : `<button class="btn btn-primary btn-small" data-action="row-set-status" data-collection="workOrders" data-row-id="${safeText(record.id)}" data-status="In Progress">Start work ${icon('arrow',14)}</button>`;
    }
  }
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.innerHTML = `<section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="row-detail-title"><div class="modal-header"><div><h2 id="row-detail-title">${safeText(title)}</h2><p>${safeText(collection)} · ${safeText(record.id)}</p></div><button class="icon-button" data-action="close-modal" aria-label="Close dialog">${icon('close',18)}</button></div><div class="modal-body">${workflowMarkup}<div class="detail-modal-grid">${detailEntries.map(([key,value])=>`<div><span>${safeText(key.replace(/([A-Z])/g,' $1').replace(/^./,x=>x.toUpperCase()))}</span><strong>${safeText(value)}</strong></div>`).join('')}</div>${description ? `<p class="detail-modal-description">${safeText(description)}</p>` : ''}${record.completionNote ? `<div class="completion-note"><strong>Technician completion note</strong><p>${safeText(record.completionNote)}</p>${record.completionEvidenceName ? `<small>Evidence selected: ${safeText(record.completionEvidenceName)} · Sample stores the filename only</small>` : ''}</div>` : ''}<div class="illustrative-note">SAMPLE RECORD · Changes stay in this browser.</div></div><div class="modal-footer"><button class="btn btn-outline btn-small" data-action="close-modal">Close</button>${footerAction}</div></section>`;
  mountDialog(modal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
}

function openColumnsDialog() {
  const table = document.querySelector('.data-table');
  if (!table) return;
  const ths = [...table.querySelectorAll('thead th')];
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.innerHTML = `<section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="column-title"><div class="modal-header"><div><h2 id="column-title">Choose visible columns</h2><p>Adjust this table for the details you need.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close dialog">${icon('close',18)}</button></div><div class="modal-body column-options">${ths.map((th,i)=>`<label><span>${safeText(th.innerText.trim()) || 'Actions'}</span><input type="checkbox" data-column-index="${i}" ${th.style.display === 'none'?'':'checked'} ${i===0?'checked':''}/></label>`).join('')}</div><div class="modal-footer"><button class="btn btn-outline btn-small" data-action="close-modal">Cancel</button><button class="btn btn-primary btn-small" data-action="apply-columns">Apply columns</button></div></section>`;
  mountDialog(modal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
}

function downloadCsv(key) {
  const db = getStore();
  const records = scopeExportRecords(key, db[key], db, { clientRoute: currentRoute().startsWith('/client') });
  if (!records.length) { toast('No records are available to export.', 'info'); return; }
  const headers = [...new Set(records.flatMap((item) => Object.keys(item)))];
  const escapeCsv = (value) => {
    let text = typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value ?? '');
    if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g,'""')}"`;
  };
  const csv = [headers.map(escapeCsv).join(','), ...records.map((record) => headers.map((header) => escapeCsv(record[header])).join(','))].join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `northline-${String(key).replace(/[^a-z0-9-]/gi,'-')}-${new Date().toISOString().slice(0,10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
  toast(`${records.length} records exported to CSV.`);
}

function applyDataFilters() {
  const query = (document.querySelector('[data-table-search]')?.value || '').trim().toLowerCase();
  const filter = (document.querySelector('[data-table-filter]')?.value || 'all').toLowerCase();
  const rows = [...document.querySelectorAll('[data-row-search]')];
  const matching = rows.filter((row) => {
    const matchesText = !query || (row.dataset.rowSearch || '').includes(query);
    const matchesFilter = filter === 'all' || (row.dataset.rowStatus || '').includes(filter);
    return matchesText && matchesFilter;
  });
  const requestedPageSize = Number(document.querySelector('[data-rows-per-page]')?.value || 10);
  const pageSize = [10,25,50].includes(requestedPageSize) ? requestedPageSize : 10;
  const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
  const panel = document.querySelector('.data-panel');
  let page = Number(panel?.dataset.page || 1);
  if (page > pageCount) page = pageCount;
  if (panel) panel.dataset.page = String(page);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, matching.length);
  const visibleRows = new Set(matching.slice(startIndex, endIndex));
  rows.forEach((row) => {
    const show = visibleRows.has(row);
    row.classList.toggle('hidden-row', !show);
    row.style.display = show ? '' : 'none';
  });
  const empty = document.querySelector('[data-table-empty]');
  if (empty) empty.classList.toggle('hidden', matching.length > 0);
  const count = document.querySelector('[data-range-count]');
  if (count && rows.length) count.textContent = matching.length ? `${startIndex + 1}–${endIndex} of ${matching.length}` : '0 records';
  const pagination = document.querySelector('.data-panel .table-pagination');
  if (pagination && rows.length) {
    const buttons = [];
    buttons.push(`<button data-table-page="${Math.max(1, page - 1)}" ${page === 1 ? 'disabled' : ''} aria-label="Previous page">${icon('chevronLeft',14)}</button>`);
    let pages = [...Array(pageCount)].map((_, index) => index + 1);
    if (pageCount > 5) pages = [...new Set([1, page - 1, page, page + 1, pageCount].filter((value) => value > 0 && value <= pageCount))].sort((a,b) => a - b);
    let last = 0;
    for (const number of pages) {
      if (last && number - last > 1) buttons.push('<span aria-hidden="true">…</span>');
      buttons.push(`<button class="page-number ${number === page ? 'active' : ''}" data-table-page="${number}" ${number === page ? 'aria-current="page"' : ''}>${number}</button>`);
      last = number;
    }
    buttons.push(`<button data-table-page="${Math.min(pageCount, page + 1)}" ${page === pageCount ? 'disabled' : ''} aria-label="Next page">${icon('chevron',14)}</button>`);
    pagination.innerHTML = buttons.join('');
  }
}

function applyServiceFilters() {
  const grid = document.querySelector('#services-grid');
  if (!grid) return;
  const active = document.querySelector('[data-service-filter].active')?.dataset.serviceFilter || 'all';
  const query = (document.querySelector('#service-search')?.value || '').trim().toLowerCase();
  const cards = [...grid.querySelectorAll('[data-service-card]')];
  let count = 0;
  cards.forEach((card) => {
    const categoryMatches = active === 'all' || card.dataset.category === active.toLowerCase();
    const textMatches = !query || card.dataset.search.includes(query);
    const visible = categoryMatches && textMatches;
    card.classList.toggle('hidden', !visible);
    if (visible) count++;
  });
  const resultCards = cards.filter((card) => !card.classList.contains('hidden'));
  grid.dataset.resultCount = String(count);
  grid.classList.toggle('has-one-result', count === 1);
  grid.classList.toggle('has-two-results', count === 2);
  grid.classList.toggle('has-three-results', count === 3);
  grid.classList.toggle('has-orphan-three-column-row', count > 3 && count % 3 === 1);
  grid.classList.toggle('has-orphan-two-column-row', count > 2 && count % 2 === 1);
  cards.forEach((card) => card.classList.toggle('last-visible-result', resultCards.at(-1) === card));
  const countNode = document.querySelector('#service-result-count');
  if (countNode) countNode.textContent = `${count} service${count === 1 ? '' : 's'}`;
  document.querySelector('#services-empty')?.classList.toggle('hidden', count > 0);
}

function parseCalendarDate(value) {
  const [year, month, day] = String(value || '').split('-').map(Number);
  return new Date(Date.UTC(year || 2026, (month || 10) - 1, day || 8, 12));
}

function calendarDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function calendarTodayKey() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: siteConfig.timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function applyCalendar() {
  const panel = document.querySelector('.calendar-panel[data-anchor]');
  const grid = panel?.querySelector('[data-calendar-grid]');
  if (!panel || !grid) return;
  let schedules = [];
  try { schedules = JSON.parse(grid.dataset.calendarEvents || '[]'); } catch { schedules = []; }
  const view = ['month','week','day'].includes(panel.dataset.view) ? panel.dataset.view : 'month';
  const property = panel.dataset.property || 'all';
  const anchor = parseCalendarDate(panel.dataset.anchor);
  const anchorYear = anchor.getUTCFullYear();
  const anchorMonth = anchor.getUTCMonth();
  const anchorDay = anchor.getUTCDate();
  const mondayOffset = (anchor.getUTCDay() + 6) % 7;
  let start;
  let count;
  if (view === 'month') {
    const first = new Date(Date.UTC(anchorYear, anchorMonth, 1, 12));
    const firstOffset = (first.getUTCDay() + 6) % 7;
    const daysInMonth = new Date(Date.UTC(anchorYear, anchorMonth + 1, 0, 12)).getUTCDate();
    count = Math.ceil((firstOffset + daysInMonth) / 7) * 7;
    start = new Date(Date.UTC(anchorYear, anchorMonth, 1 - firstOffset, 12));
  } else if (view === 'week') {
    count = 7;
    start = new Date(Date.UTC(anchorYear, anchorMonth, anchorDay - mondayOffset, 12));
  } else {
    count = 1;
    start = anchor;
  }
  const shortDay = new Intl.DateTimeFormat('en-IN', { weekday: 'short', timeZone: siteConfig.timezone });
  const shortDate = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: siteConfig.timezone });
  const fullDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: siteConfig.timezone });
  const monthTitle = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric', timeZone: siteConfig.timezone });
  const makeDate = (offset) => new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + offset, 12));
  const dates = Array.from({ length: count }, (_, index) => makeDate(index));
  let title = monthTitle.format(anchor);
  if (view === 'week') {
    const firstYear = dates[0].getUTCFullYear();
    const lastYear = dates[6].getUTCFullYear();
    title = firstYear === lastYear
      ? `${shortDate.format(dates[0])} – ${shortDate.format(dates[6])}, ${firstYear}`
      : `${fullDate.format(dates[0])} – ${fullDate.format(dates[6])}`;
  }
  if (view === 'day') title = fullDate.format(anchor);
  const titleNode = panel.querySelector('[data-calendar-title]');
  if (titleNode) titleNode.textContent = title;
  panel.querySelectorAll('[data-calendar-view]').forEach((button) => {
    const active = button.dataset.calendarView === view;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  panel.querySelectorAll('[data-calendar-shift]').forEach((button) => button.setAttribute('aria-label', `${Number(button.dataset.calendarShift) < 0 ? 'Previous' : 'Next'} ${view}`));
  const weekdayRow = panel.querySelector('[data-calendar-weekdays]');
  if (weekdayRow) {
    weekdayRow.style.display = view === 'day' ? 'none' : 'grid';
    weekdayRow.style.gridTemplateColumns = 'repeat(7, minmax(0, 1fr))';
    const headerDates = view === 'week' ? dates : dates.slice(0, 7);
    weekdayRow.innerHTML = headerDates.map((date) => `<span>${view === 'week' ? `${shortDay.format(date)} ${shortDate.format(date)}` : shortDay.format(date)}</span>`).join('');
  }
  grid.setAttribute('aria-label', `${title} maintenance visits`);
  grid.style.gridTemplateColumns = 'minmax(0, 1fr)';
  grid.dataset.view = view;
  const today = calendarTodayKey();
  const cells = dates.map((date) => {
    const dateKey = calendarDateKey(date);
    const sameMonth = date.getUTCMonth() === anchorMonth;
    const items = schedules.filter((item) => item.due === dateKey && (property === 'all' || item.property === property));
    const chips = items.map((item) => {
      const inspection = /inspection|test|audit/i.test(`${item.title} ${item.service}`);
      return `<button class="calendar-event ${inspection ? 'event-purple' : ''}" type="button" data-action="view-row" data-collection="schedules" data-row-id="${safeText(item.id)}" aria-label="${safeText(item.title)}, ${safeText(fullDate.format(date))}" title="${safeText(item.title)}"><i aria-hidden="true"></i><span class="calendar-event-title">${safeText(item.title)}</span></button>`;
    }).join('');
    return `<div class="calendar-cell ${sameMonth || view !== 'month' ? '' : 'calendar-muted'} ${dateKey === today ? 'calendar-today' : ''}" role="group" ${dateKey === today ? 'aria-current="date"' : ''} aria-label="${safeText(fullDate.format(date))}"><span class="calendar-date">${date.getUTCDate()}</span>${chips}</div>`;
  });
  const columns = view === 'day' ? 1 : 7;
  const rows = [];
  for (let index = 0; index < cells.length; index += columns) rows.push(`<div class="calendar-row ${view === 'day' ? 'calendar-row-day' : ''}">${cells.slice(index, index + columns).join('')}</div>`);
  grid.innerHTML = rows.join('');
  const agenda = document.querySelector('[data-calendar-agenda]');
  if (agenda) {
    const upcoming = schedules
      .filter((item) => item.due >= calendarTodayKey() && (property === 'all' || item.property === property))
      .sort((a, b) => String(a.due).localeCompare(String(b.due)))
      .slice(0, 4);
    agenda.innerHTML = upcoming.length ? upcoming.map((item) => {
      const due = parseCalendarDate(item.due);
      const day = new Intl.DateTimeFormat('en-IN', { day: '2-digit', timeZone: siteConfig.timezone }).format(due);
      const month = new Intl.DateTimeFormat('en-IN', { month: 'short', timeZone: siteConfig.timezone }).format(due);
      return `<div class="agenda-row"><div class="agenda-date"><strong>${day}</strong><span>${month}</span></div><div class="agenda-event"><strong>${safeText(item.title)}</strong><small>${safeText(item.property)} · ${safeText(item.technician)}</small></div>${statusBadge(item.status)}<button class="icon-button" type="button" data-action="view-row" data-collection="schedules" data-row-id="${safeText(item.id)}" aria-label="View details for ${safeText(item.title)}">${icon('chevron',15)}</button></div>`;
    }).join('') : '<p class="calendar-agenda-empty">No upcoming visits match this property filter.</p>';
  }
}

function applyBlogFilters() {
  const grid = document.querySelector('#blog-grid');
  if (!grid) return;
  const category = document.querySelector('[data-blog-filter].active')?.dataset.blogFilter || 'all';
  const query = (document.querySelector('#blog-search')?.value || '').trim().toLowerCase();
  const cards = [...grid.querySelectorAll('[data-category]')];
  const matching = cards.filter((card) => (category === 'all' || card.dataset.category === category.toLowerCase()) && (!query || (card.dataset.search || '').includes(query)));
  const pageSize = 6;
  const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
  let page = Number(grid.dataset.page || 1);
  if (page > pageCount) page = pageCount;
  if (page < 1) page = 1;
  grid.dataset.page = String(page);
  const first = (page - 1) * pageSize;
  const visibleCards = matching.slice(first, first + pageSize);
  const visible = new Set(visibleCards);
  grid.dataset.resultCount = String(visibleCards.length);
  for (const count of [1, 2, 3, 4, 5, 6]) {
    const word = ['zero','one','two','three','four','five','six'][count];
    grid.classList.toggle(`has-${word}-result${count === 1 ? '' : 's'}`, visibleCards.length === count);
  }
  const featuredSix = visibleCards.length === 6 && visibleCards.some((card) => card.classList.contains('blog-card-featured'));
  grid.classList.toggle('has-featured-six-results', featuredSix);
  const balancedFinalPair = new Set(featuredSix ? visibleCards.slice(-2) : []);
  cards.forEach((card) => {
    card.classList.toggle('hidden', !visible.has(card));
    card.classList.toggle('last-visible-result', visibleCards.at(-1) === card);
    card.classList.toggle('balanced-final-row', balancedFinalPair.has(card));
  });
  document.querySelector('#blog-empty')?.classList.toggle('hidden', matching.length > 0);
  const pagination = document.querySelector('[data-blog-pagination]');
  if (pagination) {
    const end = Math.min(first + pageSize, matching.length);
    const buttons = [`<button data-blog-page="${Math.max(1, page - 1)}" ${page === 1 ? 'disabled' : ''} aria-label="Previous article page">${icon('chevronLeft',15)}</button>`];
    let pages = [...Array(pageCount)].map((_, index) => index + 1);
    if (pageCount > 5) pages = [...new Set([1,page - 1,page,page + 1,pageCount].filter((value) => value > 0 && value <= pageCount))].sort((a,b) => a-b);
    let last = 0;
    for (const number of pages) {
      if (last && number - last > 1) buttons.push('<span aria-hidden="true">…</span>');
      buttons.push(`<button class="${number === page ? 'current-page' : ''}" data-blog-page="${number}" ${number === page ? 'aria-current="page"' : ''}>${number}</button>`);
      last = number;
    }
    buttons.push(`<button data-blog-page="${Math.min(pageCount, page + 1)}" ${page === pageCount ? 'disabled' : ''} aria-label="Next article page">${icon('chevron',15)}</button>`);
    buttons.push(`<span class="pagination-count" aria-live="polite">${matching.length ? `Showing ${first + 1}–${end} of ${matching.length} articles` : 'No matching articles'}</span>`);
    pagination.innerHTML = buttons.join('');
  }
}

function applyMessageSelection(messageId = selectedMessageId) {
  const rows = [...document.querySelectorAll('.message-row[data-message-id]')];
  if (!rows.length) return;
  const selected = rows.find((row) => row.dataset.messageId === messageId && row.style.display !== 'none')
    || rows.find((row) => row.style.display !== 'none');
  if (!selected) return;
  const changed = selectedMessageId !== selected.dataset.messageId;
  selectedMessageId = selected.dataset.messageId;
  rows.forEach((row) => row.classList.toggle('selected', row === selected));
  const reader = document.querySelector('[data-message-reading]');
  if (!reader) return;
  const sender = selected.dataset.messageSender || 'Contact';
  const company = selected.dataset.messageCompany || '';
  const time = selected.dataset.messageTime || '';
  const subject = selected.dataset.messageTitle || '';
  const preview = selected.dataset.messageThreadPreview || selected.dataset.messagePreview || '';
  const reply = selected.dataset.messageReply || '';
  const workspaceSender = currentRoute().startsWith('/technician') ? 'Senthil Kumar' : 'Kavya Raman';
  const isOutgoing = sender === workspaceSender;
  const senderNode = reader.querySelector('[data-message-reader-sender]');
  const metaNode = reader.querySelector('[data-message-reader-meta]');
  const titleNode = reader.querySelector('[data-message-reader-title]');
  if (senderNode) senderNode.textContent = sender;
  if (metaNode) metaNode.textContent = [company, time].filter(Boolean).join(' · ');
  if (titleNode) titleNode.textContent = subject;
  const avatarNode = reader.querySelector('[data-message-reader-avatar]');
  if (avatarNode) avatarNode.innerHTML = avatar(sender, 'avatar-sm avatar-palette');
  const thread = reader.querySelector('[data-message-thread]');
  if (thread) thread.innerHTML = `<div class="thread-message ${isOutgoing ? 'outgoing' : 'incoming'}"><small>${safeText(sender)}${time ? ` · ${safeText(time)}` : ''}</small><p>${safeText(preview)}</p></div>${reply ? `<div class="thread-message outgoing"><small>${workspaceSender.toUpperCase()} · Just now</small><p>${safeText(reply)}</p></div>` : ''}`;
  const form = reader.querySelector('form[data-form="message"]');
  if (form) form.dataset.threadId = selected.dataset.messageId;
  if (changed) {
    const replyInput = reader.querySelector('textarea[name="message"]');
    if (replyInput) replyInput.value = '';
  }
  reader.classList.remove('hidden');
}

function applyMessageFilters() {
  const input = document.querySelector('[data-message-query]');
  const rows = [...document.querySelectorAll('.message-row[data-message-search]')];
  if (!input || !rows.length) return;
  const query = input.value.trim().toLowerCase();
  const visible = rows.filter((row) => !query || (row.dataset.messageSearch || '').includes(query));
  rows.forEach((row) => { row.style.display = visible.includes(row) ? '' : 'none'; });
  document.querySelector('[data-message-search-empty]')?.classList.toggle('hidden', visible.length > 0);
  const reader = document.querySelector('[data-message-reading]');
  if (!visible.length) { reader?.classList.add('hidden'); return; }
  reader?.classList.remove('hidden');
  if (!visible.some((row) => row.dataset.messageId === selectedMessageId)) applyMessageSelection(visible[0].dataset.messageId);
}

function setFormFeedback(form, text, type = 'error') {
  const box = form.querySelector('.form-feedback');
  if (box) { box.textContent = text; box.className = `form-feedback${type === 'success' ? ' success' : ''}`; }
}

function checkContactForm(form) {
  let valid = true;
  form.querySelectorAll('input:not([type="file"]),select,textarea').forEach((field) => {
    const error = field.closest('label')?.querySelector('.field-error');
    let message = '';
    const value = String(field.value || '').trim();
    if (field.type === 'checkbox' && field.required && !field.checked) message = 'Please confirm before sending.';
    else if (field.required && !value && field.type !== 'checkbox') message = 'This field is required.';
    else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Enter a valid email address.';
    else if (field.type === 'tel' && value && !field.checkValidity()) message = field.title || 'Enter a valid phone number.';
    else if (field.name === 'message' && value.length < 15) message = 'Please add a little more detail (at least 15 characters).';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) {
      error.textContent = message;
      error.setAttribute('aria-live', 'polite');
      const errorId = `${form.dataset.form}-${field.name}-error`;
      error.id = errorId;
      const describedBy = new Set((field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
      if (message) describedBy.add(errorId); else describedBy.delete(errorId);
      if (describedBy.size) field.setAttribute('aria-describedby', [...describedBy].join(' '));
      else field.removeAttribute('aria-describedby');
    }
    if (message) valid = false;
  });
  const file = form.querySelector('[type="file"]')?.files?.[0];
  if (file) {
    const allowed = ['application/pdf','image/png','image/jpeg'];
    const extensionOk = /\.(pdf|png|jpe?g)$/i.test(file.name);
    if (file.size > 10 * 1024 * 1024 || !allowed.includes(file.type) || !extensionOk) {
      valid = false;
      setFormFeedback(form, 'Attachment must be a PDF, PNG or JPG file under 10 MB.');
    }
  }
  return valid;
}

function routeTo(path) {
  if (window.location.hash === `#${path}`) render();
  else window.location.hash = path;
}

function setHomeDropdownState(menu, open) {
  if (!menu) return;
  menu.classList.toggle('is-open', Boolean(open));
  if (open) menu.classList.remove('escape-dismissed');
  menu.querySelector('[data-action="toggle-home-dropdown"]')?.setAttribute('aria-expanded', String(Boolean(open)));
}

function handleClick(event) {
  const homeMenu = document.querySelector('.home-menu.is-open');
  if (homeMenu && !homeMenu.contains(event.target)) setHomeDropdownState(homeMenu, false);
  if (!event.target.closest('.profile-popover,[data-action="profile-menu"]')) {
    document.querySelector('.profile-popover')?.remove();
    document.querySelectorAll('[data-action="profile-menu"]').forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
  }
  const fragmentLink = event.target.closest('a[href^="#"]:not([href^="#/"])');
  if (fragmentLink && fragmentLink.getAttribute('href') !== '#') {
    let targetId = fragmentLink.getAttribute('href').slice(1);
    try { targetId = decodeURIComponent(targetId); } catch { /* Keep the literal fragment if it is malformed. */ }
    const target = document.getElementById(targetId);
    if (target) {
      event.preventDefault();
      if (!target.hasAttribute('tabindex') && !target.matches('a,button,input,select,textarea')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      return;
    }
  }
  const pageButton = event.target.closest('[data-table-page]');
  if (pageButton && !pageButton.disabled) {
    event.preventDefault();
    const panel = pageButton.closest('.data-panel');
    if (panel) panel.dataset.page = pageButton.dataset.tablePage;
    applyDataFilters();
    return;
  }
  const serviceFilter = event.target.closest('[data-service-filter]');
  if (serviceFilter) {
    event.preventDefault();
    document.querySelectorAll('[data-service-filter]').forEach((button) => button.classList.toggle('active', button === serviceFilter));
    applyServiceFilters();
    return;
  }
  const blogPageButton = event.target.closest('[data-blog-page]');
  if (blogPageButton && !blogPageButton.disabled) {
    event.preventDefault();
    const grid = document.querySelector('#blog-grid');
    if (grid) grid.dataset.page = blogPageButton.dataset.blogPage;
    applyBlogFilters();
    return;
  }
  const blogFilter = event.target.closest('[data-blog-filter]');
  if (blogFilter) {
    event.preventDefault();
    document.querySelectorAll('[data-blog-filter]').forEach((button) => { const selected = button === blogFilter; button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected)); });
    const grid = document.querySelector('#blog-grid');
    if (grid) grid.dataset.page = '1';
    applyBlogFilters();
    return;
  }
  const billingButton = event.target.closest('[data-billing]');
  if (billingButton) {
    event.preventDefault();
    updateBillingPrices(billingButton.dataset.billing);
    toast(`${billingButton.dataset.billing === 'annual' ? 'Annual' : 'Monthly'} prices selected. Quotes are scoped to your facility.`, 'info');
    return;
  }
  const calendarPanel = document.querySelector('.calendar-panel[data-anchor]');
  const calendarShift = event.target.closest('[data-calendar-shift]');
  if (calendarShift && calendarPanel) {
    event.preventDefault();
    const anchor = parseCalendarDate(calendarPanel.dataset.anchor);
    const shift = Number(calendarShift.dataset.calendarShift) || 0;
    const view = calendarPanel.dataset.view || 'month';
    if (view === 'month') {
      const targetMonth = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + shift, 1, 12));
      const year = targetMonth.getUTCFullYear();
      const month = targetMonth.getUTCMonth();
      const day = Math.min(anchor.getUTCDate(), new Date(Date.UTC(year, month + 1, 0, 12)).getUTCDate());
      targetMonth.setUTCDate(day);
      calendarPanel.dataset.anchor = calendarDateKey(targetMonth);
    } else {
      anchor.setUTCDate(anchor.getUTCDate() + shift * (view === 'week' ? 7 : 1));
      calendarPanel.dataset.anchor = calendarDateKey(anchor);
    }
    applyCalendar();
    return;
  }
  const calendarToday = event.target.closest('[data-calendar-today]');
  if (calendarToday && calendarPanel) {
    event.preventDefault();
    calendarPanel.dataset.anchor = calendarTodayKey();
    applyCalendar();
    return;
  }
  const calendarButton = event.target.closest('[data-calendar-view]');
  if (calendarButton && calendarPanel) {
    event.preventDefault();
    calendarPanel.dataset.view = calendarButton.dataset.calendarView;
    applyCalendar();
    return;
  }
  const actionNode = event.target.closest('[data-action]');
  if (!actionNode) return;
  const action = actionNode.dataset.action;
  if (action !== 'sort-table' && actionNode.tagName === 'BUTTON' && action !== 'row-set-status') event.preventDefault();
  switch (action) {
    case 'toggle-theme': {
      const currentTheme = document.documentElement.dataset.theme || 'light';
      const next = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      toast(`${next === 'dark' ? 'Dark' : 'Light'} appearance enabled.`, 'info');
      break;
    }
    case 'set-direction': {
      const direction = applyDirection(actionNode.dataset.direction);
      toast(`Text direction set to ${direction.toUpperCase()}.`, 'info');
      break;
    }
    case 'social-signin': {
      const provider = ['Google', 'Apple'].includes(actionNode.dataset.provider) ? actionNode.dataset.provider : 'Social';
      toast(`${provider} sign-in is not connected. No authentication request was sent.`, 'info');
      break;
    }
    case 'set-theme': applyTheme(actionNode.dataset.themeValue); toast(`Theme set to ${actionNode.dataset.themeValue}.`, 'info'); break;
    case 'toggle-home-dropdown': {
      const menu = actionNode.closest('.home-menu');
      const open = actionNode.getAttribute('aria-expanded') !== 'true';
      setHomeDropdownState(menu, open);
      if (!open && menu?.matches(':hover')) menu.classList.add('escape-dismissed');
      break;
    }
    case 'toggle-public-menu': {
      const nav = document.querySelector('#primary-nav');
      const isOpen = nav?.classList.toggle('open');
      actionNode.setAttribute('aria-expanded', String(Boolean(isOpen)));
      actionNode.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      actionNode.innerHTML = icon(isOpen ? 'close' : 'menu', 21);
      break;
    }
    case 'toggle-sidebar': {
      const sidebar = document.querySelector('.app-sidebar');
      const scrim = document.querySelector('.sidebar-scrim');
      const open = sidebar?.classList.toggle('open');
      const trigger = document.querySelector('.sidebar-toggle');
      scrim?.classList.toggle('open', Boolean(open));
      trigger?.setAttribute('aria-expanded', String(Boolean(open)));
      trigger?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      if (trigger) trigger.innerHTML = icon(open ? 'close' : 'menu', 19);
      if (open) sidebar?.querySelector('.sidebar-close')?.focus();
      else trigger?.focus();
      break;
    }
    case 'open-create': openCreateDialog(actionNode.dataset.entity); break;
    case 'close-modal': closeModal(); break;
    case 'cookie-accept': localStorage.setItem('northline.cookies', JSON.stringify({ necessary: true, analytics: true, preferences: true, marketing: true })); closeModal(); document.querySelector('#cookie-banner')?.remove(); toast('Privacy choices saved. No optional trackers are connected.', 'info'); break;
    case 'cookie-reject': localStorage.setItem('northline.cookies', JSON.stringify({ necessary: true, analytics: false, preferences: false, marketing: false })); closeModal(); document.querySelector('#cookie-banner')?.remove(); toast('Optional privacy categories saved as off.', 'info'); break;
    case 'cookie-customize': openCookieSettings(); break;
    case 'cookie-save': {
      const values = { necessary: true };
      document.querySelectorAll('[data-cookie-choice]').forEach((input) => values[input.dataset.cookieChoice] = input.checked);
      localStorage.setItem('northline.cookies', JSON.stringify(values)); closeModal(); document.querySelector('#cookie-banner')?.remove(); toast('Your privacy choices have been saved.', 'info'); break;
    }
    case 'export-csv': downloadCsv(actionNode.dataset.export); break;
    case 'mark-read': {
      const route = currentRoute();
      if (route.startsWith('/admin')) markAllRead();
      else {
        const kind = route.startsWith('/client') ? 'client' : 'technician';
        getWorkspaceNotifications(kind, getStore()).filter((notification) => notification.unread).forEach((notification) => updateRecord('notifications', notification.id, { unread: false }));
      }
      render(); toast('Visible workspace notifications marked as read.');
      break;
    }
    case 'toggle-notification': {
      const notification = getStore().notifications.find((item) => item.id === actionNode.dataset.rowId);
      if (!notification) { toast('This notification is no longer available.', 'info'); break; }
      const updated = updateRecord('notifications', notification.id, { unread: !notification.unread });
      if (updated) { render(); toast(`${notification.title} marked as ${updated.unread ? 'unread' : 'read'}.`, 'info'); }
      break;
    }
    case 'open-notifications': {
      const route = currentRoute();
      routeTo(route.startsWith('/client') ? '/client/notifications' : route.startsWith('/technician') ? '/technician/notifications' : '/admin/notifications');
      break;
    }
    case 'dismiss-notice': actionNode.closest('.portal-notice')?.remove(); break;
    case 'toggle-password': {
      const input = actionNode.closest('.password-field')?.querySelector('input');
      if (input) { input.type = input.type === 'password' ? 'text' : 'password'; actionNode.setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password'); }
      break;
    }
    case 'logout': routeTo('/login'); toast('You have left the workspace preview.', 'info'); break;
    case 'testimonial-next': {
      const track = document.querySelector('#testimonial-track');
      if (track?.lastElementChild) track.prepend(track.lastElementChild);
      break;
    }
    case 'testimonial-prev': {
      const track = document.querySelector('#testimonial-track');
      if (track?.firstElementChild) track.append(track.firstElementChild);
      break;
    }
    case 'share': {
      navigator.clipboard?.writeText(window.location.href).then(() => toast('Article link copied.')).catch(() => toast('Copy the page URL to share this article.', 'info'));
      break;
    }
    case 'row-menu': openRowMenu(actionNode); break;
    case 'view-row': closeModal(); openRowDetails(actionNode.dataset.rowId, actionNode.dataset.collection || 'workOrders'); break;
    case 'row-set-status': {
      const updated = updateWorkOrder(actionNode.dataset.rowId, { status: actionNode.dataset.status });
      if (updated) { closeModal(); render(); toast(`${updated.id} updated to ${updated.status}.`); }
      else toast('That status change is not available from the work order’s current state.', 'info');
      break;
    }
    case 'assign-work-order': {
      const db = getStore();
      const order = db.workOrders.find((item) => item.id === actionNode.dataset.rowId);
      const available = db.technicians.find((technician) => technician.status === 'Available' && technician.name !== order?.assignee);
      if (!order) { toast('This work order is no longer available.', 'error'); break; }
      if (!available) { toast('No field technician is currently marked available.', 'info'); break; }
      const updated = updateWorkOrder(order.id, { assignee: available.name, status: 'Assigned' });
      if (updated) { closeModal(); render(); toast(`${updated.id} assigned to ${available.name}.`); }
      break;
    }
    case 'update-record': {
      let patch;
      try { patch = JSON.parse(actionNode.dataset.patch || '{}'); } catch { patch = null; }
      const updated = patch && updateRecord(actionNode.dataset.collection, actionNode.dataset.rowId, patch);
      if (updated) { closeModal(); render(); toast(`${updated.name || updated.title || updated.id} updated.`); }
      else toast('The record could not be updated.', 'error');
      break;
    }
    case 'table-columns': openColumnsDialog(); break;
    case 'apply-columns': {
      const table = document.querySelector('.data-table');
      const checks = [...document.querySelectorAll('[data-column-index]')];
      checks.forEach((check) => {
        const index = Number(check.dataset.columnIndex);
        [...table.rows].forEach((row) => { if (row.cells[index]) row.cells[index].style.display = check.checked ? '' : 'none'; });
      });
      closeModal(); toast('Table columns updated.'); break;
    }
    case 'sort-table': {
      const button = actionNode;
      const th = button.closest('th');
      const table = button.closest('table');
      const tbody = table?.querySelector('tbody');
      if (!tbody) break;
      const direction = th.dataset.direction === 'asc' ? 'desc' : 'asc';
      th.dataset.direction = direction;
      const index = [...th.parentElement.children].indexOf(th);
      const rows = [...tbody.querySelectorAll('tr:not(.no-rows)')];
      rows.sort((a,b) => {
        const x = a.cells[index]?.innerText.trim().toLowerCase() || '';
        const y = b.cells[index]?.innerText.trim().toLowerCase() || '';
        return (x.localeCompare(y, undefined, { numeric: true }) || 0) * (direction === 'asc' ? 1 : -1);
      }).forEach((row) => tbody.append(row));
      break;
    }
    case 'download-sample': {
      const row = actionNode.closest('.document-row,tr');
      const content = `Northline Facilities — fictional sample document\n\n${row?.innerText?.replace(/\s+/g,' ').trim() || 'Sample report'}\n\nThis file is an illustrative text preview, not a client report.`;
      const href = URL.createObjectURL(new Blob([content], { type:'text/plain;charset=utf-8' }));
      const link = document.createElement('a'); link.href = href; link.download = 'northline-operations-note.txt'; link.click(); URL.revokeObjectURL(href);
      toast('Sample text file downloaded.'); break;
    }
    case 'select-message': {
      selectedMessageId = actionNode.dataset.messageId || '';
      const message = getStore().messages.find((item) => item.id === selectedMessageId);
      if (message?.unread) updateRecord('messages', selectedMessageId, { unread: false });
      actionNode.classList.remove('unread');
      actionNode.querySelector('.message-unread-dot')?.remove();
      const unreadCount = document.querySelectorAll('.message-row.unread').length;
      const unreadNode = document.querySelector('[data-message-unread-count]');
      if (unreadNode) unreadNode.textContent = `${unreadCount} unread`;
      applyMessageSelection(selectedMessageId);
      break;
    }
    case 'compose-message': openCreateDialog('message'); break;
    case 'message-attachment-unavailable': toast('File attachments are not enabled in this sample; no file was selected or uploaded.', 'info'); break;
    case 'job-details': openRowDetails(actionNode.dataset.rowId); break;
    case 'open-completion': openCompletionDialog(actionNode.dataset.rowId); break;
    case 'technician-complete': {
      const order = getStore().workOrders.find((item) => item.id === actionNode.dataset.rowId);
      if (!order) { toast('Assigned work order not found.', 'error'); break; }
      if (order.status === 'In Progress') { openCompletionDialog(order.id); break; }
      if (!['Assigned','Dispatched'].includes(order.status)) { toast('Only assigned or dispatched work can be started.', 'info'); break; }
      const updated = updateWorkOrder(order.id, { status: 'In Progress' });
      if (updated) { render(); toast(`${order.id} marked in progress.`); }
      else toast('This work order cannot be started from its current state.', 'info');
      break;
    }
    case 'tech-toggle-status': {
      const technician = getStore().technicians.find((item) => item.id === actionNode.dataset.techId);
      if (!technician) { toast('Technician profile not found in the  data.', 'info'); break; }
      const status = technician.status === 'Available' ? 'On site' : 'Available';
      const updated = updateRecord('technicians', technician.id, { status });
      if (updated) { render(); toast(`Availability set to ${status.toLowerCase()} in this sample.`, 'info'); }
      break;
    }
    case 'safety-check': toast('Site guidance reviewed. Follow the client’s site induction and PPE instructions.', 'info'); break;
    case 'calendar-view': {
      const calendar = document.querySelector('.calendar-panel[data-anchor]');
      if (calendar) calendar.dataset.view = actionNode.dataset.calendarView;
      applyCalendar();
      break;
    }
    case 'billing': break;
    case 'save-settings': {
      const fields = [...document.querySelectorAll('.settings-form-grid input,.settings-form-grid textarea,.settings-form-grid select')].map((field) => field.value);
      const notifications = [...document.querySelectorAll('.settings-toggle-row input[type="checkbox"]')].map((field) => field.checked);
      localStorage.setItem('northline.workspaceSettings', JSON.stringify({ fields, notifications }));
      toast('Workspace preferences saved in this browser.');
      break;
    }
    case 'profile-menu': {
      const existing = document.querySelector('.profile-popover');
      if (existing) {
        existing.remove();
        actionNode.setAttribute('aria-expanded', 'false');
        break;
      }
      const pop = document.createElement('div'); pop.className = 'profile-popover';
      pop.innerHTML = `<a href="#/client/dashboard">${icon('users',15)} Client sample</a><a href="#/admin/dashboard">${icon('settings',15)} Operations sample</a><a href="#/technician/today">${icon('wrench',15)} Field team sample</a><button type="button" data-action="logout">${icon('logout',15)} Sign out</button>`;
      actionNode.parentElement.append(pop);
      actionNode.setAttribute('aria-expanded', 'true');
      break;
    }
    case 'row-menu-close': document.querySelector('.row-menu-popover')?.remove(); break;
    default: break;
  }
}

function handleInput(event) {
  if (event.target.matches('[data-table-search],[data-table-filter]')) applyDataFilters();
  if (event.target.matches('#service-search,[data-service-filter]')) applyServiceFilters();
  if (event.target.matches('#blog-search')) {
    const grid = document.querySelector('#blog-grid');
    if (grid) grid.dataset.page = '1';
    applyBlogFilters();
  }
  if (event.target.matches('[data-blog-filter]')) applyBlogFilters();
  if (event.target.matches('[data-message-query]')) applyMessageFilters();
  if (event.target.matches('[data-global-search]') && event.target.value.trim()) {
    const query = event.target.value.trim().toLowerCase();
    const target = currentRoute().startsWith('/admin') ? '/admin/work-orders' : '/services';
    if (query.length > 2 && event.inputType === 'insertLineBreak') routeTo(target);
  }
}

function handleChange(event) {
  if (event.target.matches('[data-rows-per-page]')) {
    const panel = event.target.closest('.data-panel');
    if (panel) panel.dataset.page = '1';
    applyDataFilters();
  }
  if (event.target.matches('[data-calendar-property]')) {
    const calendar = document.querySelector('.calendar-panel[data-anchor]');
    if (calendar) calendar.dataset.property = event.target.value;
    applyCalendar();
  }
  if (event.target.matches('#client-locale-select,#settings-locale-select')) {
    applyLocale(event.target.value);
    render();
  }
  if (event.target.matches('[data-service-filter]')) applyServiceFilters();
  if (event.target.matches('[data-blog-filter]')) applyBlogFilters();
  if (event.target.matches('[data-table-filter]')) applyDataFilters();
  if (event.target.matches('[data-billing]')) updateBillingPrices(event.target.dataset.billing);
  if (event.target.matches('input[type="file"]')) {
    const file = event.target.files?.[0];
    const label = event.target.closest('label');
    const text = label?.querySelector('.file-upload-box span');
    if (text && file) text.textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB`;
  }
}

async function handleSubmit(event) {
  const form = event.target.closest('form[data-form]');
  if (!form) return;
  event.preventDefault();
  const type = form.dataset.form;
  const submit = form.querySelector('button[type="submit"]');
  if (submit) { submit.disabled = true; submit.dataset.originalText = submit.textContent; submit.textContent = type === 'contact' ? 'Checking…' : 'Submitting…'; }
  try {
    if (type === 'contact') {
      if (!checkContactForm(form)) { setFormFeedback(form, 'Please review the highlighted fields and try again.'); return; }
      setFormFeedback(form, 'Your details passed the form check. This form is not connected to an enquiry inbox, so no request was sent.', 'success');
    } else if (type === 'newsletter') {
      if (!form.reportValidity()) return;
      await new Promise((resolve) => setTimeout(resolve, 300));
      const feedback = document.createElement('span'); feedback.className = 'newsletter-confirmation'; feedback.textContent = 'Thanks — this sample does not subscribe or store your email.';
      form.replaceWith(feedback); toast('Thanks for your interest. No email was stored.', 'info');
    } else if (type === 'auth') {
      if (!form.reportValidity()) return;
      const register = form.dataset.register === 'true';
      if (register && form.elements.password.value !== form.elements.confirmPassword.value) {
        const feedback = form.querySelector('.form-feedback');
        if (feedback) feedback.id = 'auth-feedback';
        form.elements.confirmPassword.setAttribute('aria-invalid', 'true');
        form.elements.confirmPassword.setAttribute('aria-describedby', 'auth-feedback');
        setFormFeedback(form, 'Passwords do not match. Please confirm the same password.');
        toast('Passwords do not match. Please check the confirmation field.', 'error');
        return;
      }
      form.elements.confirmPassword?.removeAttribute('aria-invalid');
      form.elements.confirmPassword?.removeAttribute('aria-describedby');
      const authFeedback = form.querySelector('.form-feedback');
      if (authFeedback) { authFeedback.textContent = ''; authFeedback.removeAttribute('id'); }
      form.reset();
      if (register) {
        toast('Account created successfully! This is a preview account. No information was stored.');
      } else {
        toast('Login successful! This is a sample login. No credentials were stored.');
      }
      // Sample authentication deliberately stays on the current auth page and never sends or persists form values.
    } else if (type === 'forgot') {
      if (!form.reportValidity()) return;
      setFormFeedback(form, 'If a matching account exists, a reset link would be sent. Email delivery is not enabled in this sample.', 'success');
      form.reset();
    } else if (type === 'complete-work-order') {
      if (!form.reportValidity()) return;
      const note = String(form.elements.completionNote.value || '').trim();
      const file = form.elements.completionEvidence.files?.[0];
      if (note.length < 12) { setFormFeedback(form, 'Add a short, useful handover note (at least 12 characters).'); return; }
      if (file) {
        const allowedType = ['application/pdf','image/png','image/jpeg'].includes(file.type);
        const allowedName = /\.(pdf|png|jpe?g)$/i.test(file.name);
        if (!allowedType || !allowedName || file.size > 10 * 1024 * 1024) { setFormFeedback(form, 'Choose a PDF, PNG or JPG file under 10 MB. The sample keeps only its filename.'); return; }
      }
      const updated = updateWorkOrder(form.dataset.rowId, { status: 'Completed', completionNote: note, completionEvidenceName: file?.name || '', completedAt: new Date().toLocaleString('en-IN', { timeZone: siteConfig.timezone }), siteSafetyConfirmedAt: new Date().toLocaleString('en-IN', { timeZone: siteConfig.timezone }) });
      if (!updated) { setFormFeedback(form, 'This work order is no longer in a completable state.'); return; }
      closeModal(); render(); toast(`${updated.id} completion submitted for review.`);
    } else if (type === 'create-record') {
      if (!form.reportValidity()) return;
      const file = form.querySelector('input[type="file"]')?.files?.[0];
      if (file) {
        const ok = ['application/pdf','image/png','image/jpeg'].includes(file.type) && /\.(pdf|png|jpe?g)$/i.test(file.name) && file.size <= 10 * 1024 * 1024;
        if (!ok) { setFormFeedback(form, 'Choose a PDF, PNG or JPG file under 10 MB.'); return; }
      }
      const fields = Object.fromEntries(new FormData(form).entries());
      delete fields.attachment;
      if (form.dataset.entity === 'message') {
        if (currentRoute().startsWith('/client')) { fields.sender = 'Kavya Raman'; fields.company = 'Meridian Workspaces'; }
        else if (currentRoute().startsWith('/technician')) { fields.sender = 'Senthil Kumar'; fields.company = 'Technician'; }
      }
      const record = addRecord(form.dataset.entity, fields);
      if (!record) { setFormFeedback(form, 'This record type is not enabled in the local sample.'); return; }
      const label = form.dataset.entity === 'work-order' ? 'Work order' : form.dataset.entity.replace('-', ' ').replace(/\b\w/g, (m) => m.toUpperCase());
      if (form.dataset.entity === 'message') selectedMessageId = record.id;
      closeModal(); render(); toast(`${label} ${record.id || ''} created in this browser.`);
    } else if (type === 'message') {
      const data = new FormData(form);
      const message = String(data.get('message') || '').trim();
      if (!message) { setFormFeedback(form, 'Write a message before sending.'); return; }
      const threadId = form.dataset.threadId;
      if (threadId) {
        const originalMessage = getStore().messages.find((item) => item.id === threadId);
        const updated = updateRecord('messages', threadId, { originalPreview: originalMessage?.originalPreview || originalMessage?.preview || '', preview: message.slice(0, 160), reply: message.slice(0, 1200), time: 'Just now', unread: false });
        if (!updated) { setFormFeedback(form, 'This conversation is no longer available.'); return; }
        render(); toast('Reply saved in this browser sample. No email was sent.');
      } else {
        form.reset(); toast('Message added to the local workspace preview. No email was sent.');
      }
    }
  } catch (error) {
    console.error('Form submission failed', error);
    setFormFeedback(form, 'Something went wrong. Please try again.');
  } finally {
    if (submit?.isConnected) { submit.disabled = false; submit.textContent = submit.dataset.originalText || 'Submit'; }
  }
}

document.addEventListener('click', handleClick);
document.addEventListener('input', handleInput);
document.addEventListener('change', handleChange);
document.addEventListener('submit', handleSubmit);
document.addEventListener('keydown', (event) => {
  const activeDialog = document.querySelector('.modal-backdrop [role="dialog"],.cookie-consent-modal [role="dialog"]');
  if (event.key === 'Tab' && activeDialog) {
    const focusable = [...activeDialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter((node) => node.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first) { event.preventDefault(); activeDialog.focus(); }
    else if (event.shiftKey && (document.activeElement === first || !activeDialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || !activeDialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
  }
  if (event.key === 'Escape') {
    const menuOpen = Boolean(document.querySelector('.profile-popover'));
    const trigger = document.querySelector('[data-action="profile-menu"][aria-expanded="true"]') || document.querySelector('.topbar-profile');
    const sidebar = document.querySelector('.app-sidebar.open');
    const publicNav = document.querySelector('.primary-nav.open');
    const homeMenu = document.querySelector('.home-menu.is-open');
    if (homeMenu) {
      const homeTrigger = homeMenu.querySelector('[data-action="toggle-home-dropdown"]');
      setHomeDropdownState(homeMenu, false);
      homeMenu.classList.add('escape-dismissed');
      homeTrigger?.focus();
    }
    closeModal();
    if (menuOpen) { trigger?.setAttribute('aria-expanded', 'false'); trigger?.focus(); }
    else if (homeMenu) { /* Let the first Escape dismiss the nested Home menu only. */ }
    else if (publicNav) {
      publicNav.classList.remove('open');
      const menuButton = document.querySelector('.mobile-menu-toggle');
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.setAttribute('aria-label', 'Open navigation');
      if (menuButton) menuButton.innerHTML = icon('menu', 21);
      menuButton?.focus();
    }
    else if (sidebar) {
      sidebar.classList.remove('open');
      document.querySelector('.sidebar-scrim')?.classList.remove('open');
      const menuButton = document.querySelector('.sidebar-toggle');
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.setAttribute('aria-label', 'Open navigation');
      if (menuButton) menuButton.innerHTML = icon('menu', 19);
      menuButton?.focus();
    }
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    if (window.matchMedia?.('(max-width:1160px)').matches) {
      const sidebarMenu = document.querySelector('.app-sidebar');
      const menuButton = document.querySelector('.sidebar-toggle');
      if (sidebarMenu && !sidebarMenu.classList.contains('open')) {
        sidebarMenu.classList.add('open');
        document.querySelector('.sidebar-scrim')?.classList.add('open');
        menuButton?.setAttribute('aria-expanded', 'true');
        menuButton?.setAttribute('aria-label', 'Close navigation');
        if (menuButton) menuButton.innerHTML = icon('close', 19);
      }
      sidebarMenu?.querySelector('.sidebar-mobile-search [data-global-search]')?.focus();
    } else document.querySelector('.app-topbar-actions [data-global-search]')?.focus();
  }
  if (event.key === 'Enter' && event.target.matches('[data-global-search]')) {
    event.preventDefault();
    const query = event.target.value.trim();
    if (query) routeTo(currentRoute().startsWith('/admin') ? '/admin/work-orders' : '/services');
  }
});
window.addEventListener('hashchange', () => {
  if (!window.location.hash || window.location.hash.startsWith('#/')) {
    closeModal(); render(); window.scrollTo({ top: 0, behavior: 'instant' });
  }
});
window.addEventListener('scroll', () => document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 10), { passive: true });
window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', () => { if (themePreference === 'system') applyTheme('system'); });

applyLocale(getLocale());
render();
