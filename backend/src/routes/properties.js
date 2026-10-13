import { Router } from 'express';
import { prisma } from '../config/database.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { listPropertiesSchema } from '../validators/common.js';
import { success } from '../utils/respond.js';

export const propertiesRouter = Router();
propertiesRouter.use(requireAuth);

propertiesRouter.get('/', validate(listPropertiesSchema, 'query'), async (req, res) => {
  const { page, pageSize, q } = req.validated.query;
  const role = req.user.role.name.toUpperCase();
  const where = {
    deletedAt: null,
    ...(role === 'CLIENT' ? { companyId: req.user.companyId } : {}),
    ...(role === 'TECHNICIAN' ? { workOrders: { some: { assignedToId: req.user.id, deletedAt: null } } } : {}),
    ...(q ? { OR: [
      { name: { contains: q, mode: 'insensitive' } },
      { city: { contains: q, mode: 'insensitive' } },
      { addressLine1: { contains: q, mode: 'insensitive' } }
    ] } : {})
  };
  const [items, total] = await prisma.$transaction([
    prisma.property.findMany({ where, select: { id: true, name: true, type: true, addressLine1: true, addressLine2: true, city: true, region: true, postalCode: true, countryCode: true, areaSqFt: true, status: true, company: { select: { id: true, name: true } }, assignedManager: { select: { id: true, name: true } } }, orderBy: { name: 'asc' }, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.property.count({ where })
  ]);
  return success(res, { items, page, pageSize, total }, 'Properties loaded.');
});
