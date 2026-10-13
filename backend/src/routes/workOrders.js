import { Router } from 'express';
import { randomBytes } from 'node:crypto';
import { prisma } from '../config/database.js';
import { requireAuth } from '../middleware/auth.js';
import { csrfProtection } from '../middleware/csrf.js';
import { validate } from '../middleware/validate.js';
import { createWorkOrderSchema, listWorkOrdersSchema, updateWorkOrderSchema } from '../validators/workOrders.js';
import { idParamSchema } from '../validators/common.js';
import { HttpError } from '../utils/httpError.js';
import { success } from '../utils/respond.js';
import { z } from 'zod';
import { canClientUpdateWorkOrder, canTransitionWorkOrder } from '../domain/workOrderWorkflow.js';

export const workOrdersRouter = Router();
workOrdersRouter.use(requireAuth);
workOrdersRouter.use(csrfProtection);
const managerRoles = new Set(['SUPER_ADMIN','ADMIN','MANAGER']);
const commentSchema = z.object({ body: z.string().trim().min(1).max(3000), isInternal: z.boolean().optional().default(false) }).strict();
const workOrderInclude = {
  property: { select: { id: true, name: true, addressLine1: true, city: true, region: true } },
  service: { select: { id: true, name: true, slug: true } },
  assignedTo: { select: { id: true, name: true } },
  createdBy: { select: { id: true, name: true } }
};

function scopedWhere(user) {
  const role = user.role.name.toUpperCase();
  if (role === 'CLIENT') return { companyId: user.companyId, deletedAt: null };
  if (role === 'TECHNICIAN') return { assignedToId: user.id, deletedAt: null };
  return { deletedAt: null };
}

workOrdersRouter.get('/', validate(listWorkOrdersSchema, 'query'), async (req, res) => {
  const { page, pageSize, status, priority, propertyId, q } = req.validated.query;
  const where = {
    ...scopedWhere(req.user),
    ...(status ? { status } : {}),
    ...(priority ? { priority } : {}),
    ...(propertyId ? { propertyId } : {}),
    ...(q ? { OR: [
      { reference: { contains: q, mode: 'insensitive' } },
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { property: { name: { contains: q, mode: 'insensitive' } } }
    ] } : {})
  };
  const [items, total] = await prisma.$transaction([
    prisma.workOrder.findMany({ where, include: workOrderInclude, orderBy: [{ requestedAt: 'desc' }, { id: 'asc' }], skip: (page - 1) * pageSize, take: pageSize }),
    prisma.workOrder.count({ where })
  ]);
  return success(res, { items, page, pageSize, total }, 'Work orders loaded.');
});

workOrdersRouter.post('/', validate(createWorkOrderSchema), async (req, res) => {
  const role = req.user.role.name.toUpperCase();
  if (!['CLIENT','SUPER_ADMIN','ADMIN','MANAGER'].includes(role)) throw new HttpError(403, 'You do not have permission to create a work order.');
  const { propertyId, serviceId, title, description, category, location, priority } = req.body;
  const propertyWhere = { id: propertyId, deletedAt: null, ...(role === 'CLIENT' ? { companyId: req.user.companyId } : {}) };
  const property = await prisma.property.findFirst({ where: propertyWhere, select: { id: true, companyId: true, clientId: true, name: true } });
  if (!property) throw new HttpError(404, 'The selected property was not found or is outside your account.');
  if (serviceId) {
    const service = await prisma.service.findFirst({ where: { id: serviceId, isPublished: true, deletedAt: null }, select: { id: true } });
    if (!service) throw new HttpError(422, 'Choose an active service.');
  }
  const reference = `WO-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString('hex').toUpperCase()}`;
  const created = await prisma.$transaction(async (tx) => {
    const record = await tx.workOrder.create({ data: {
      reference,
      companyId: property.companyId,
      clientId: property.clientId,
      propertyId: property.id,
      serviceId: serviceId || null,
      title,
      description,
      category,
      location: location || null,
      priority,
      createdById: req.user.id,
      requestedAt: new Date()
    }, include: workOrderInclude });
    await tx.workOrderHistory.create({ data: { workOrderId: record.id, actorId: req.user.id, toStatus: 'NEW', action: 'WORK_ORDER_CREATED', note: 'Request submitted.' } });
    await tx.auditLog.create({ data: { actorId: req.user.id, action: 'work_order.created', entityType: 'WorkOrder', entityId: record.id, ipAddress: req.ip || null } });
    return record;
  });
  return success(res, created, 'Work order created successfully.', 201);
});

workOrdersRouter.get('/:id', validate(idParamSchema, 'params'), async (req, res) => {
  const where = { id: req.validated.params.id, ...scopedWhere(req.user) };
  const client = req.user.role.name.toUpperCase() === 'CLIENT';
  const record = await prisma.workOrder.findFirst({
    where,
    include: {
      ...workOrderInclude,
      attachments: { select: { id: true, originalName: true, mimeType: true, sizeBytes: true, createdAt: true } },
      history: { orderBy: { createdAt: 'asc' }, select: { id: true, action: true, fromStatus: true, toStatus: true, note: true, createdAt: true } },
      comments: { where: client ? { isInternal: false } : {}, orderBy: { createdAt: 'asc' }, select: { id: true, body: true, isInternal: true, createdAt: true, author: { select: { id: true, name: true } } } }
    }
  });
  if (!record) throw new HttpError(404, 'Work order not found.');
  return success(res, record, 'Work order loaded.');
});

workOrdersRouter.patch('/:id', validate(idParamSchema, 'params'), validate(updateWorkOrderSchema), async (req, res) => {
  const id = req.validated.params.id;
  const role = req.user.role.name.toUpperCase();
  const baseWhere = { id, ...scopedWhere(req.user) };
  const existing = await prisma.workOrder.findFirst({ where: baseWhere });
  if (!existing) throw new HttpError(404, 'Work order not found.');
  const patch = req.body;
  const status = patch.status;
  let nextStatus = existing.status;

  if (role === 'CLIENT') {
    if (!canClientUpdateWorkOrder(status, existing.status, existing.createdById, req.user.id) || Object.keys(patch).some((key) => !['status','note'].includes(key))) {
      throw new HttpError(403, 'Clients may cancel their own new requests or approve completed work assigned to their company.');
    }
  } else if (role === 'TECHNICIAN') {
    if (existing.assignedToId !== req.user.id) throw new HttpError(404, 'Work order not found.');
    const technicianStatuses = new Set(['IN_PROGRESS','ON_HOLD','WAITING_FOR_PARTS','COMPLETED']);
    if (status && (!technicianStatuses.has(status) || !canTransitionWorkOrder(existing.status, status))) throw new HttpError(409, 'That status change is not available for this work order.');
    if (Object.keys(patch).some((key) => !['status','note','completionNote','siteSafetyConfirmed'].includes(key))) throw new HttpError(403, 'Technicians may update assigned job status and submit completion details only.');
    if ((patch.completionNote || patch.siteSafetyConfirmed !== undefined) && status !== 'COMPLETED') throw new HttpError(422, 'Completion details may only be submitted with a completion status.');
    if (patch.siteSafetyConfirmed !== undefined && patch.siteSafetyConfirmed !== true) throw new HttpError(422, 'Confirm the site is safe before submitting completion.');
  } else if (managerRoles.has(role)) {
    if (patch.completionNote || patch.siteSafetyConfirmed !== undefined) throw new HttpError(403, 'Completion details must be submitted by the assigned technician.');
    if (status === 'COMPLETED') throw new HttpError(403, 'Only the assigned technician may submit job completion.');
    if (status === 'CLOSED') throw new HttpError(403, 'Client approval is required before closing this work order.');
  } else {
    throw new HttpError(403, 'You do not have permission to update this work order.');
  }

  if (status && status !== existing.status) {
    if (!canTransitionWorkOrder(existing.status, status)) throw new HttpError(409, 'This work order status transition is not allowed.');
    nextStatus = status;
  }
  if (Object.hasOwn(patch, 'assignedToId') && patch.assignedToId) {
    if (!managerRoles.has(role)) throw new HttpError(403, 'Only operations managers may assign a technician.');
    if (existing.status !== 'ASSIGNED' && status !== 'ASSIGNED') throw new HttpError(409, 'Move the work order to Assigned before selecting a technician.');
    const assignee = await prisma.user.findFirst({ where: { id: patch.assignedToId, status: 'ACTIVE', role: { name: 'TECHNICIAN' }, deletedAt: null }, select: { id: true } });
    if (!assignee) throw new HttpError(422, 'Choose an active technician account.');
  }
  if (status === 'ASSIGNED' && !patch.assignedToId && !existing.assignedToId) throw new HttpError(422, 'Assign an active technician before moving the work order to Assigned.');

  const now = new Date();
  const timestampFields = {
    ASSIGNED: { assignedAt: now },
    DISPATCHED: { dispatchedAt: now },
    IN_PROGRESS: { startedAt: existing.startedAt || now },
    COMPLETED: { completedAt: now },
    CLIENT_APPROVAL: { completedAt: existing.completedAt || now },
    CLOSED: { closedAt: now }
  };
  const data = {
    ...(patch.priority ? { priority: patch.priority } : {}),
    ...(Object.hasOwn(patch, 'assignedToId') ? { assignedToId: patch.assignedToId, assignedAt: patch.assignedToId ? now : null } : {}),
    ...(typeof patch.estimatedCost === 'number' ? { estimatedCost: patch.estimatedCost } : {}),
    ...(typeof patch.actualCost === 'number' ? { actualCost: patch.actualCost } : {}),
    ...(patch.completionNote ? { completionNote: patch.completionNote } : {}),
    ...(patch.siteSafetyConfirmed === true ? { siteSafetyConfirmedAt: now } : {}),
    ...(role === 'CLIENT' && status === 'CLOSED' ? { clientApprovedAt: now, clientApprovedById: req.user.id } : {}),
    ...(status ? { status: nextStatus, ...(timestampFields[nextStatus] || {}) } : {})
  };
  const updated = await prisma.$transaction(async (tx) => {
    const record = await tx.workOrder.update({ where: { id: existing.id }, data, include: workOrderInclude });
    if (status && status !== existing.status) {
      await tx.workOrderHistory.create({ data: { workOrderId: id, actorId: req.user.id, fromStatus: existing.status, toStatus: nextStatus, action: 'STATUS_CHANGED', note: patch.note || patch.completionNote || null } });
    } else if (patch.note) {
      await tx.workOrderHistory.create({ data: { workOrderId: id, actorId: req.user.id, action: 'NOTE_ADDED', note: patch.note } });
    }
    await tx.auditLog.create({ data: { actorId: req.user.id, action: status ? 'work_order.status_changed' : 'work_order.updated', entityType: 'WorkOrder', entityId: id, ipAddress: req.ip || null, metadata: { status: nextStatus } } });
    return record;
  });
  return success(res, updated, 'Work order updated successfully.');
});

workOrdersRouter.post('/:id/comments', validate(idParamSchema, 'params'), validate(commentSchema), async (req, res) => {
  const role = req.user.role.name.toUpperCase();
  const record = await prisma.workOrder.findFirst({ where: { id: req.validated.params.id, ...scopedWhere(req.user) }, select: { id: true } });
  if (!record) throw new HttpError(404, 'Work order not found.');
  const isInternal = managerRoles.has(role) && req.body.isInternal;
  const comment = await prisma.$transaction(async (tx) => {
    const created = await tx.workOrderComment.create({ data: { workOrderId: record.id, authorId: req.user.id, body: req.body.body, isInternal } });
    await tx.workOrderHistory.create({ data: { workOrderId: record.id, actorId: req.user.id, action: 'COMMENT_ADDED', note: isInternal ? 'Internal note added.' : 'Comment added.' } });
    await tx.auditLog.create({ data: { actorId: req.user.id, action: 'work_order.comment_added', entityType: 'WorkOrder', entityId: record.id, ipAddress: req.ip || null } });
    return created;
  });
  return success(res, comment, 'Comment added.', 201);
});
