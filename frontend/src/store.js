import { clients, properties, users, technicians, services, workOrders, schedules, invoices, notifications, messages, blogPosts } from './demoData.js';
import { siteConfig } from './siteConfig.js';

const STORAGE_KEY = 'northline.fm.demo.v1';
const seed = { clients, properties, users, technicians, services, workOrders, schedules, invoices, notifications, messages, blogPosts, auditLogs: [] };
const clone = (value) => JSON.parse(JSON.stringify(value));
const todayInIndia = () => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: siteConfig.timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};
const istTimestamp = () => new Date().toLocaleString('en-IN', { timeZone: siteConfig.timezone });

export function getStore() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return clone(seed);
    const saved = JSON.parse(value);
    const store = Object.fromEntries(Object.keys(seed).map((key) => [key, Array.isArray(saved[key]) ? saved[key] : clone(seed[key])]));
    store.workOrders = store.workOrders.map((order) => order.status === 'Technician En Route' ? { ...order, status: 'Dispatched' } : order);
    return store;
  } catch {
    return clone(seed);
  }
}

export function saveStore(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (error) { console.warn('Workspace could not be saved:', error); }
  return data;
}

export function resetDemo() {
  localStorage.removeItem(STORAGE_KEY);
  return getStore();
}

export function addWorkOrder(fields) {
  const db = getStore();
  const nextNumber = Math.max(4821, ...db.workOrders.map((item) => Number(item.id.replace('WO-', '')) || 0)) + 1;
  const id = `WO-${nextNumber}`;
  const property = db.properties.find((p) => p.name === fields.property) || db.properties[0];
  const record = {
    id,
    title: String(fields.title || fields.description || 'Service request').trim().slice(0, 100),
    client: fields.client || property.client,
    property: property.name,
    category: fields.category || 'Maintenance',
    priority: fields.priority || 'Medium',
    status: 'New',
    assignee: 'Unassigned',
    date: todayInIndia(),
    location: String(fields.location || 'Site location to confirm').trim().slice(0, 80),
    description: String(fields.description || fields.title || '').trim().slice(0, 1200)
  };
  db.workOrders.unshift(record);
  db.notifications.unshift({ id: `NT-${Date.now()}`, title: 'New service request', body: `${id} · ${record.title} was submitted.`, time: 'Just now', type: 'dispatch', unread: true });
  db.auditLogs.unshift({ id: `AU-${Date.now()}`, action: 'Created work order', entity: 'Work order', entityId: id, actor: 'Sample user', time: istTimestamp() });
  saveStore(db);
  return record;
}

const WORK_ORDER_TRANSITIONS = {
  'New': ['Pending Review','Cancelled'],
  'Pending Review': ['Assigned','On Hold','Cancelled'],
  'Assigned': ['Dispatched','In Progress','On Hold','Cancelled'],
  'Dispatched': ['In Progress','On Hold'],
  'In Progress': ['Completed','On Hold','Waiting for Parts'],
  'On Hold': ['In Progress','Waiting for Parts','Cancelled'],
  'Waiting for Parts': ['In Progress','On Hold'],
  'Completed': ['Client Approval','In Progress'],
  'Client Approval': ['Closed','In Progress'],
  'Closed': [],
  'Cancelled': []
};

export function updateWorkOrder(id, patch) {
  const db = getStore();
  const index = db.workOrders.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const current = db.workOrders[index];
  if (patch.status && patch.status !== current.status && !WORK_ORDER_TRANSITIONS[current.status]?.includes(patch.status)) return null;
  if (patch.status === 'Completed' && (String(patch.completionNote || '').trim().length < 12 || !patch.siteSafetyConfirmedAt)) return null;
  db.workOrders[index] = {
    ...current,
    ...patch,
    ...(patch.status === 'Closed' && current.status === 'Client Approval' ? { clientApprovedAt: patch.clientApprovedAt || istTimestamp(), clientApprovedBy: patch.clientApprovedBy || 'Meridian Contact' } : {})
  };
  db.auditLogs.unshift({ id: `AU-${Date.now()}`, action: 'Updated work order', entity: 'Work order', entityId: id, actor: 'Sample user', time: istTimestamp() });
  saveStore(db);
  return db.workOrders[index];
}

export function addRecord(type, fields) {
  if (type === 'work-order') return addWorkOrder(fields);
  const db = getStore();
  const safe = (key, fallback = '') => String(fields[key] ?? fallback).trim().slice(0, 240);
  const nextId = (items, prefix, width = 4) => `${prefix}-${String(Math.max(0, ...items.map((item) => Number(String(item.id || '').split('-').pop()) || 0)) + 1).padStart(width, '0')}`;
  const now = todayInIndia();
  let collection;
  let record;
  if (type === 'user' || type === 'technician') {
    collection = 'users';
    record = { id: nextId(db.users, 'US', 4), name: safe('name', 'New team member'), email: safe('email', 'new.user@example.com'), role: type === 'technician' ? 'Technician' : safe('role', 'Client'), company: safe('company', 'Northline Facilities'), status: 'Invited', lastActive: '—' };
    db.users.unshift(record);
    if (type === 'technician') db.technicians.unshift({ id: nextId(db.technicians, 'TN', 3), name: record.name, initials: record.name.split(/\\s+/).map((x) => x[0]).join('').slice(0,2).toUpperCase(), skills: safe('skills', 'General maintenance'), status: 'Available', jobs: 0, rating: '—', response: '—', completed: '—' });
  } else if (type === 'client') {
    collection = 'clients';
    record = { id: nextId(db.clients, 'CL'), name: safe('name', 'New client'), contact: safe('contact', 'To be confirmed'), email: safe('email'), properties: 0, contract: safe('contract', 'Professional'), status: 'Active' };
    db.clients.unshift(record);
  } else if (type === 'property') {
    collection = 'properties';
    record = { id: nextId(db.properties, 'PR'), name: safe('name', 'New property'), type: safe('type', 'Commercial'), client: safe('client', db.clients[0]?.name), address: safe('address', 'Address to confirm'), area: safe('area', 'To be confirmed'), manager: safe('manager', 'Unassigned'), health: 100, status: 'Operational' };
    db.properties.unshift(record);
  } else if (type === 'schedule') {
    collection = 'schedules';
    record = { id: nextId(db.schedules, 'PM'), title: safe('title', 'New planned maintenance'), property: safe('property', db.properties[0]?.name), service: safe('service', 'Maintenance'), technician: safe('technician', 'Unassigned'), due: safe('due', now), recurrence: safe('recurrence', 'Monthly'), status: 'Scheduled' };
    db.schedules.unshift(record);
  } else if (type === 'service') {
    collection = 'services';
    record = { id: nextId(db.services, 'SV', 3), name: safe('name', 'New service'), category: safe('category', 'Maintenance'), description: safe('description', 'Service description to confirm'), icon: 'wrench' };
    db.services.unshift(record);
  } else if (type === 'invoice') {
    collection = 'invoices';
    record = { id: nextId(db.invoices, 'INV'), client: safe('client', db.clients[0]?.name), property: safe('property', db.properties[0]?.name), issue: now, due: safe('due', now), amount: Number(fields.amount) || 0, status: 'Draft' };
    db.invoices.unshift(record);
  } else if (type === 'post') {
    collection = 'blogPosts';
    const slug = safe('title', 'New article').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70) || `draft-${Date.now()}`;
    record = { id: nextId(db.blogPosts, 'BL', 3), slug, title: safe('title', 'New article'), category: safe('category', 'Industry insights'), date: 'Draft · ' + now, read: 'Draft', author: safe('author', 'Northline team'), excerpt: safe('excerpt', 'Draft article ready for editing.'), featured: false, status: 'Draft' };
    db.blogPosts.unshift(record);
  } else if (type === 'message') {
    collection = 'messages';
    record = { id: nextId(db.messages, 'MS', 3), sender: safe('sender', 'Ananya Iyer'), company: safe('company', 'Northline Facilities'), subject: safe('subject', 'New conversation'), preview: safe('body', 'Message draft'), time: 'Just now', unread: false };
    db.messages.unshift(record);
  }
  if (!record) return null;
  db.auditLogs.unshift({ id: `AU-${Date.now()}`, action: `Created ${collection.replace(/s$/, '')}`, entity: collection, entityId: record.id, actor: 'Sample user', time: istTimestamp() });
  saveStore(db);
  return record;
}

export function updateRecord(collection, id, patch) {
  const allowed = new Set(['users','clients','properties','technicians','services','schedules','invoices','messages','notifications','blogPosts']);
  if (!allowed.has(collection)) return null;
  const db = getStore();
  const index = db[collection].findIndex((item) => item.id === id);
  if (index < 0) return null;
  db[collection][index] = { ...db[collection][index], ...patch };
  db.auditLogs.unshift({ id: `AU-${Date.now()}`, action: `Updated ${collection.replace(/s$/, '')}`, entity: collection, entityId: id, actor: 'Sample user', time: istTimestamp() });
  saveStore(db);
  return db[collection][index];
}

export function markAllRead() {
  const db = getStore();
  db.notifications = db.notifications.map((item) => ({ ...item, unread: false }));
  saveStore(db);
}

export function apiRequest(path, options = {}) {
  const base = import.meta.env?.VITE_API_BASE || '';
  return fetch(`${base}${path}`, { credentials: 'include', ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
}
