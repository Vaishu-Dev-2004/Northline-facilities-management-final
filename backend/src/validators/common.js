import { z } from 'zod';

export const listPropertiesSchema = z.object({ page: z.coerce.number().int().min(1).default(1), pageSize: z.coerce.number().int().min(1).max(50).default(20), q: z.string().trim().max(100).optional() }).strict();
export const idParamSchema = z.object({ id: z.string().cuid() });
