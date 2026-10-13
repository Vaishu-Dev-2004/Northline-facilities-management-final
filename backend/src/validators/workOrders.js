import { z } from 'zod';
import { WORK_ORDER_STATUSES } from '../domain/workOrderWorkflow.js';

const priority = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
const status = z.enum(WORK_ORDER_STATUSES);

export const listWorkOrdersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
  status: status.optional(),
  priority: priority.optional(),
  propertyId: z.string().cuid().optional(),
  q: z.string().trim().max(100).optional()
}).strict();

export const createWorkOrderSchema = z.object({
  companyId: z.string().cuid().optional(),
  propertyId: z.string().cuid(),
  serviceId: z.string().cuid().optional(),
  title: z.string().trim().min(4).max(180),
  description: z.string().trim().min(10).max(5000),
  category: z.string().trim().min(2).max(80),
  location: z.string().trim().max(180).optional(),
  priority: priority.default('MEDIUM')
}).strict();

export const updateWorkOrderSchema = z.object({
  status: status.optional(),
  priority: priority.optional(),
  assignedToId: z.string().cuid().nullable().optional(),
  estimatedCost: z.number().nonnegative().max(10000000).optional(),
  actualCost: z.number().nonnegative().max(10000000).optional(),
  completionNote: z.string().trim().min(12).max(3000).optional(),
  siteSafetyConfirmed: z.boolean().optional(),
  note: z.string().trim().max(2000).optional()
}).strict()
  .refine((value) => Object.keys(value).length > 0, { message: 'Provide at least one field to update.' })
  .refine((value) => value.status !== 'COMPLETED' || Boolean(value.completionNote), { message: 'A completion note is required before marking a work order complete.', path: ['completionNote'] })
  .refine((value) => value.status !== 'COMPLETED' || value.siteSafetyConfirmed === true, { message: 'Confirm the site is safe before submitting completion.', path: ['siteSafetyConfirmed'] });
