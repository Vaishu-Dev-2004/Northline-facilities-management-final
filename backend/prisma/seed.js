import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { clients, properties, users, technicians, services, workOrders, schedules, invoices, blogPosts, notifications, messages, testimonials } from '../../frontend/src/demoData.js';

const prisma = new PrismaClient();
const slugify = (value) => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const companyIndex = new Map();
const clientIndex = new Map();
const userIndex = new Map();
const propertyIndex = new Map();
const serviceIndex = new Map();
const statusMap = { 'New':'NEW','Pending Review':'PENDING_REVIEW','Assigned':'ASSIGNED','Dispatched':'DISPATCHED','Technician En Route':'DISPATCHED','In Progress':'IN_PROGRESS','On Hold':'ON_HOLD','Waiting for Parts':'WAITING_FOR_PARTS','Completed':'COMPLETED','Client Approval':'CLIENT_APPROVAL','Closed':'CLOSED','Cancelled':'CANCELLED' };
const priorityMap = { Low:'LOW',Medium:'MEDIUM',High:'HIGH',Critical:'CRITICAL' };
const recurrenceMap = { Daily:'DAILY',Weekly:'WEEKLY',Monthly:'MONTHLY',Quarterly:'QUARTERLY',Yearly:'YEARLY',Custom:'CUSTOM' };
const invoiceStatusMap = { Draft:'DRAFT',Pending:'PENDING',Paid:'PAID','Partially Paid':'PARTIALLY_PAID',Overdue:'OVERDUE',Cancelled:'CANCELLED' };

async function getCompany(name) {
  if (companyIndex.has(name)) return companyIndex.get(name);
  let company = await prisma.company.findFirst({ where: { name, deletedAt: null } });
  if (!company) company = await prisma.company.create({ data: { name, legalName: name, status: 'ACTIVE' } });
  companyIndex.set(name, company);
  return company;
}

async function main() {
  console.info('Seeding Northline fictional demo data…');
  const roleDefinitions = [
    ['SUPER_ADMIN','Full platform administration'],['ADMIN','Company administration'],['MANAGER','Operations and reporting'],['TECHNICIAN','Assigned field work'],['CLIENT','Own company and property access']
  ];
  const roles = new Map();
  for (const [name, description] of roleDefinitions) roles.set(name, await prisma.role.upsert({ where: { name }, update: { description }, create: { name, description } }));
  const permissionKeys = ['users.read','users.manage','clients.read','clients.manage','properties.read','properties.manage','work_orders.read','work_orders.create','work_orders.manage','technicians.manage','maintenance.manage','invoices.read','invoices.manage','messages.read','reports.read','blog.manage','settings.manage','audit.read'];
  const permissionRecords = new Map();
  for (const key of permissionKeys) permissionRecords.set(key, await prisma.permission.upsert({ where: { key }, update: {}, create: { key, description: `Permission: ${key}` } }));
  const rolePermissions = {
    SUPER_ADMIN: permissionKeys,
    ADMIN: permissionKeys.filter((key) => key !== 'settings.manage' && key !== 'audit.read'),
    MANAGER: ['clients.read','properties.read','properties.manage','work_orders.read','work_orders.create','work_orders.manage','technicians.manage','maintenance.manage','invoices.read','messages.read','reports.read','blog.manage'],
    TECHNICIAN: ['properties.read','work_orders.read'],
    CLIENT: ['properties.read','work_orders.read','work_orders.create','invoices.read','messages.read']
  };
  for (const [roleName, keys] of Object.entries(rolePermissions)) {
    for (const key of keys) await prisma.rolePermission.upsert({ where: { roleId_permissionId: { roleId: roles.get(roleName).id, permissionId: permissionRecords.get(key).id } }, update: {}, create: { roleId: roles.get(roleName).id, permissionId: permissionRecords.get(key).id } });
  }

  const northline = await getCompany('Northline Facilities');
  for (const client of clients) {
    const company = await getCompany(client.name);
    let record = await prisma.client.findUnique({ where: { companyId: company.id } });
    if (!record) record = await prisma.client.create({ data: { companyId: company.id, contractPlan: client.contract.toUpperCase() } });
    else if (record.contractPlan !== client.contract.toUpperCase()) record = await prisma.client.update({ where: { id: record.id }, data: { contractPlan: client.contract.toUpperCase() } });
    companyIndex.set(client.name, company);
    clientIndex.set(client.name, record);
  }

  for (const fixture of users) {
    const roleKey = fixture.role.toUpperCase().replaceAll(' ', '_');
    const role = roles.get(roleKey) || roles.get('CLIENT');
    const companyName = fixture.company;
    const company = companyName === 'Northline Facilities' ? northline : await getCompany(companyName);
    const verified = fixture.status === 'Active';
    const user = await prisma.user.upsert({
      where: { email: fixture.email.toLowerCase() },
      update: { name: fixture.name, roleId: role.id, companyId: company.id, status: fixture.status === 'Inactive' ? 'DEACTIVATED' : fixture.status === 'Invited' ? 'INVITED' : 'ACTIVE', emailVerifiedAt: verified ? new Date('2026-01-15T12:00:00.000Z') : null },
      create: { email: fixture.email.toLowerCase(), name: fixture.name, roleId: role.id, companyId: company.id, status: fixture.status === 'Inactive' ? 'DEACTIVATED' : fixture.status === 'Invited' ? 'INVITED' : 'ACTIVE', emailVerifiedAt: verified ? new Date('2026-01-15T12:00:00.000Z') : null, passwordHash: null }
    });
    userIndex.set(fixture.name, user);
  }
  const demoUsers = await prisma.user.findMany({ where: { email: { in: users.map((u) => u.email.toLowerCase()) } }, select: { id: true, name: true, email: true, role: { select: { name: true } }, companyId: true } });
  for (const user of demoUsers) userIndex.set(user.name, user);

  for (const tech of technicians) {
    const user = userIndex.get(tech.name);
    if (!user) continue;
    const profile = await prisma.technician.upsert({ where: { userId: user.id }, update: { availability: tech.status === 'Available' ? 'AVAILABLE' : tech.status === 'On site' ? 'BUSY' : tech.status === 'On break' ? 'ON_BREAK' : 'OFFLINE' }, create: { userId: user.id, availability: tech.status === 'Available' ? 'AVAILABLE' : tech.status === 'On site' ? 'BUSY' : tech.status === 'On break' ? 'ON_BREAK' : 'OFFLINE' } });
    for (const skill of tech.skills.split(' · ')) {
      const exists = await prisma.technicianSkill.findFirst({ where: { technicianId: profile.id, skill } });
      if (!exists) await prisma.technicianSkill.create({ data: { technicianId: profile.id, skill } });
    }
    const certification = `${tech.skills.split(' · ')[0]} field certification`;
    const certExists = await prisma.technicianCertification.findFirst({ where: { technicianId: profile.id, name: certification } });
    if (!certExists) await prisma.technicianCertification.create({ data: { technicianId: profile.id, name: certification, issuer: 'Northline Skills Programme', issuedAt: new Date('2025-01-10T12:00:00.000Z') } });
  }

  for (const item of properties) {
    const company = companyIndex.get(item.client) || await getCompany(item.client);
    const client = clientIndex.get(item.client);
    const [addressLine1, city, region] = item.address.split(',').map((part) => part.trim());
    const areaSqFt = Number(String(item.area).replace(/[^0-9]/g,'')) || null;
    let record = await prisma.property.findFirst({ where: { name: item.name, companyId: company.id, deletedAt: null } });
    const data = { companyId: company.id, clientId: client?.id || null, name: item.name, type: item.type, addressLine1, city: city || 'Coimbatore', region: region || 'Tamil Nadu', postalCode: '641014', countryCode: 'IN', areaSqFt, status: item.status === 'Attention' ? 'ATTENTION' : 'OPERATIONAL', assignedManagerId: userIndex.get(item.manager)?.id || null };
    if (!record) record = await prisma.property.create({ data });
    else record = await prisma.property.update({ where: { id: record.id }, data });
    propertyIndex.set(item.name, record);
  }

  const categoryRecords = new Map();
  for (const category of [...new Set(services.map((service) => service.category))]) {
    const slug = slugify(category);
    const record = await prisma.serviceCategory.upsert({ where: { slug }, update: { name: category }, create: { name: category, slug } });
    categoryRecords.set(category, record);
  }
  for (const service of services) {
    const slug = slugify(service.name);
    const record = await prisma.service.upsert({
      where: { slug },
      update: { name: service.name, summary: service.description, categoryId: categoryRecords.get(service.category).id, isPublished: true },
      create: { name: service.name, slug, summary: service.description, description: service.description, categoryId: categoryRecords.get(service.category).id, isPublished: true }
    });
    serviceIndex.set(service.name, record);
  }

  const adminUser = userIndex.get('Ananya Iyer') || demoUsers.find((user) => user.role.name === 'ADMIN');
  for (const [index, fixture] of workOrders.entries()) {
    const property = propertyIndex.get(fixture.property);
    const company = companyIndex.get(fixture.client);
    const client = clientIndex.get(fixture.client);
    if (!property || !company) continue;
    const createdBy = userIndex.get(fixture.client === 'Northline Facilities' ? 'Ananya Iyer' : (clients.find((c) => c.name === fixture.client)?.contact || 'Ananya Iyer')) || adminUser;
    const assignedTo = fixture.assignee === 'Unassigned' ? null : userIndex.get(fixture.assignee) || null;
    const svc = serviceIndex.get(services.find((service) => service.category.toLowerCase().includes(fixture.category.toLowerCase()) || fixture.category.toLowerCase().includes(service.name.toLowerCase().split(' ')[0]))?.name) || null;
    const reference = fixture.id;
    const requestedAt = new Date(`${fixture.date}T10:00:00.000Z`);
    const status = statusMap[fixture.status] || 'NEW';
    const record = await prisma.workOrder.upsert({
      where: { reference },
      update: { companyId: company.id, clientId: client?.id || null, propertyId: property.id, title: fixture.title, category: fixture.category, description: fixture.description || `${fixture.title} reported at ${fixture.location}. Please inspect, document findings and share the recommended next step.`, location: fixture.location, priority: priorityMap[fixture.priority] || 'MEDIUM', status, assignedToId: assignedTo?.id || null, serviceId: svc?.id || null, currency: 'INR', assignedAt: ['ASSIGNED','DISPATCHED','IN_PROGRESS','ON_HOLD','WAITING_FOR_PARTS','COMPLETED','CLIENT_APPROVAL','CLOSED'].includes(status) ? requestedAt : null, dispatchedAt: status === 'DISPATCHED' ? requestedAt : null, startedAt: ['IN_PROGRESS','COMPLETED','CLIENT_APPROVAL','CLOSED'].includes(status) ? requestedAt : null, completedAt: ['COMPLETED','CLIENT_APPROVAL','CLOSED'].includes(status) ? requestedAt : null, completionNote: ['COMPLETED','CLIENT_APPROVAL','CLOSED'].includes(status) ? 'Fictional demo handover: inspected, tested and left the work area safe.' : null, siteSafetyConfirmedAt: ['COMPLETED','CLIENT_APPROVAL','CLOSED'].includes(status) ? requestedAt : null, clientApprovedAt: status === 'CLOSED' ? requestedAt : null, clientApprovedById: status === 'CLOSED' ? createdBy?.id || null : null, closedAt: status === 'CLOSED' ? requestedAt : null },
      create: { reference, companyId: company.id, clientId: client?.id || null, propertyId: property.id, serviceId: svc?.id || null, category: fixture.category, title: fixture.title, description: fixture.description || `${fixture.title} reported at ${fixture.location}. Please inspect, document findings and share the recommended next step.`, location: fixture.location, priority: priorityMap[fixture.priority] || 'MEDIUM', status, createdById: createdBy?.id || adminUser.id, assignedToId: assignedTo?.id || null, requestedAt, currency: 'INR', assignedAt: ['ASSIGNED','DISPATCHED','IN_PROGRESS','ON_HOLD','WAITING_FOR_PARTS','COMPLETED','CLIENT_APPROVAL','CLOSED'].includes(status) ? requestedAt : null, dispatchedAt: status === 'DISPATCHED' ? requestedAt : null, startedAt: ['IN_PROGRESS','COMPLETED','CLIENT_APPROVAL','CLOSED'].includes(status) ? requestedAt : null, completedAt: ['COMPLETED','CLIENT_APPROVAL','CLOSED'].includes(status) ? requestedAt : null, completionNote: ['COMPLETED','CLIENT_APPROVAL','CLOSED'].includes(status) ? 'Fictional demo handover: inspected, tested and left the work area safe.' : null, siteSafetyConfirmedAt: ['COMPLETED','CLIENT_APPROVAL','CLOSED'].includes(status) ? requestedAt : null, clientApprovedAt: status === 'CLOSED' ? requestedAt : null, clientApprovedById: status === 'CLOSED' ? createdBy?.id || null : null, closedAt: status === 'CLOSED' ? requestedAt : null }
    });
    const historyExists = await prisma.workOrderHistory.findFirst({ where: { workOrderId: record.id } });
    if (!historyExists) await prisma.workOrderHistory.create({ data: { workOrderId: record.id, actorId: createdBy?.id || adminUser.id, toStatus: status, action: 'DEMO_SEED', note: `${index + 1}.` } });
  }

  for (const fixture of schedules) {
    const property = propertyIndex.get(fixture.property);
    if (!property) continue;
    const company = companyIndex.get(properties.find((item) => item.name === fixture.property)?.client) || northline;
    const service = services.find((item) => item.name.toLowerCase().includes(fixture.service.toLowerCase())) || services[0];
    const serviceRecord = serviceIndex.get(service.name);
    const due = new Date(`${fixture.due}T09:00:00.000Z`);
    const exists = await prisma.maintenanceSchedule.findFirst({ where: { propertyId: property.id, title: fixture.title, nextDueAt: due } });
    if (!exists) await prisma.maintenanceSchedule.create({ data: { companyId: company.id, propertyId: property.id, serviceId: serviceRecord?.id, title: fixture.title, recurrence: recurrenceMap[fixture.recurrence] || 'MONTHLY', nextDueAt: due, assignedToId: userIndex.get(fixture.technician)?.id || null, status: fixture.status === 'At risk' ? 'AT_RISK' : 'SCHEDULED', timezone: 'Asia/Kolkata', reminderDays: 3 } });
  }

  for (const fixture of invoices) {
    const company = companyIndex.get(fixture.client);
    const property = propertyIndex.get(fixture.property);
    if (!company) continue;
    const issue = new Date(`${fixture.issue}T12:00:00.000Z`);
    const due = new Date(`${fixture.due}T12:00:00.000Z`);
    const data = { companyId: company.id, clientId: clientIndex.get(fixture.client)?.id || null, propertyId: property?.id || null, status: invoiceStatusMap[fixture.status] || 'PENDING', amountSubtotal: fixture.amount, amountTax: 0, amountTotal: fixture.amount, currency: 'INR', issuedAt: issue, dueAt: due };
    const record = await prisma.invoice.upsert({ where: { reference: fixture.id }, update: data, create: { reference: fixture.id, ...data } });
    if (fixture.status === 'Paid') {
      const payment = await prisma.payment.findFirst({ where: { invoiceId: record.id, providerPaymentId: `demo-${fixture.id}` } });
      if (!payment) await prisma.payment.create({ data: { invoiceId: record.id, provider: 'DEMO', providerPaymentId: `demo-${fixture.id}`, amount: fixture.amount, currency: 'INR', status: 'SUCCEEDED', paidAt: issue } });
    }
  }

  for (const category of ['Facility management','Maintenance','Workplace safety','Sustainability','Technology','Industry insights']) {
    const slug = slugify(category);
    await prisma.blogCategory.upsert({ where: { slug }, update: { name: category }, create: { name: category, slug } });
  }
  for (const post of blogPosts) {
    const category = await prisma.blogCategory.findFirst({ where: { name: { equals: post.category, mode: 'insensitive' } } }) || await prisma.blogCategory.findFirst({ where: { slug: 'facility-management' } });
    const author = userIndex.get(post.author) || adminUser;
    const publishedAt = new Date(`${post.date.replace('Oct ','2026-10-').replace('Sep ','2026-09-').replace('Aug ','2026-08-').replace('Jul ','2026-07-').replace(/, 2026/,'')}T12:00:00.000Z`);
    const parsedDate = Number.isNaN(publishedAt.getTime()) ? new Date('2026-09-01T12:00:00.000Z') : publishedAt;
    await prisma.blogPost.upsert({ where: { slug: post.slug }, update: { title: post.title, excerpt: post.excerpt, status: 'PUBLISHED', authorId: author?.id, categoryId: category?.id, publishedAt: parsedDate, body: `${post.excerpt}\n\nNorthline field notes translate practical building operations into useful decisions for the people who care for facilities.` }, create: { slug: post.slug, title: post.title, excerpt: post.excerpt, body: `${post.excerpt}\n\nNorthline field notes translate practical building operations into useful decisions for the people who care for facilities.`, status: 'PUBLISHED', authorId: author?.id, categoryId: category?.id, publishedAt: parsedDate, metaTitle: post.title, metaDescription: post.excerpt } });
  }

  for (const fixture of notifications) {
    const user = userIndex.get('Kavya Raman') || adminUser;
    const exists = await prisma.notification.findFirst({ where: { userId: user.id, title: fixture.title, createdAt: { gte: new Date('2026-10-01T00:00:00.000Z') } } });
    if (!exists) await prisma.notification.create({ data: { userId: user.id, title: fixture.title, body: fixture.body, channel: 'IN_APP', readAt: fixture.unread ? null : new Date('2026-10-07T12:00:00.000Z'), data: { demoType: fixture.type } } });
  }

  for (const fixture of messages) {
    const companyName = fixture.company === 'Technician' ? 'Meridian Workspaces' : fixture.company;
    const company = companyIndex.get(companyName) || companyIndex.get('Meridian Workspaces');
    const participant = userIndex.get(fixture.sender) || userIndex.get('Kavya Raman');
    const existing = await prisma.messageThread.findFirst({ where: { companyId: company.id, subject: fixture.subject } });
    if (existing) continue;
    const clientParticipant = userIndex.get('Kavya Raman');
    const members = [...new Set([participant.id, clientParticipant.id])];
    if (members.length === 1) members.push(adminUser.id);
    const thread = await prisma.messageThread.create({ data: { companyId: company.id, subject: fixture.subject, members: { create: members.map((userId) => ({ userId })) } } });
    await prisma.message.create({ data: { threadId: thread.id, senderId: participant.id, body: fixture.preview.replace(/\.\.\.$/,'') } });
  }

  for (const fixture of testimonials) {
    const exists = await prisma.testimonial.findFirst({ where: { clientName: fixture.name, companyName: fixture.company } });
    if (!exists) await prisma.testimonial.create({ data: { clientName: fixture.name, role: fixture.role, companyName: fixture.company, quote: fixture.quote, rating: 5, isPublished: true, sortOrder: 1 } });
  }
  const counts = await Promise.all([prisma.company.count(),prisma.user.count(),prisma.property.count(),prisma.service.count(),prisma.workOrder.count(),prisma.technician.count(),prisma.maintenanceSchedule.count(),prisma.invoice.count(),prisma.notification.count(),prisma.message.count(),prisma.blogPost.count()]);
  console.info(JSON.stringify({ companies: counts[0], users: counts[1], properties: counts[2], services: counts[3], workOrders: counts[4], technicians: counts[5], schedules: counts[6], invoices: counts[7], notifications: counts[8], messages: counts[9], posts: counts[10] }));
  console.info('Seeded  users have no password hash; configure invitations/verification rather than using shared demo credentials.');
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => { await prisma.$disconnect(); });
