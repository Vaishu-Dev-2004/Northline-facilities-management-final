import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { success } from '../utils/respond.js';

export const servicesRouter = Router();
const listSchema = z.object({ page: z.coerce.number().int().min(1).default(1), pageSize: z.coerce.number().int().min(1).max(50).default(20), category: z.string().trim().max(100).optional(), q: z.string().trim().max(100).optional() }).strict();

servicesRouter.get('/', validate(listSchema, 'query'), async (req, res) => {
  const { page, pageSize, category, q } = req.validated.query;
  const where = {
    isPublished: true,
    deletedAt: null,
    ...(category ? { category: { slug: category.toLowerCase().replace(/[^a-z0-9]+/g,'-') } } : {}),
    ...(q ? { OR: [ { name: { contains: q, mode: 'insensitive' } }, { summary: { contains: q, mode: 'insensitive' } } ] } : {})
  };
  const [items, total] = await prisma.$transaction([
    prisma.service.findMany({ where, select: { id: true, name: true, slug: true, summary: true, category: { select: { name: true, slug: true } } }, orderBy: [{ category: { name: 'asc' } }, { name: 'asc' }], skip: (page - 1) * pageSize, take: pageSize }),
    prisma.service.count({ where })
  ]);
  return success(res, { items, page, pageSize, total }, 'Services loaded.');
});
