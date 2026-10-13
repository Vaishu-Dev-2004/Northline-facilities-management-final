import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { csrfProtection } from '../middleware/csrf.js';
import { success } from '../utils/respond.js';

export const contactRouter = Router();
const schema = z.object({
  name: z.string().trim().min(2).max(140),
  company: z.string().trim().max(180).optional().or(z.literal('')),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  service: z.string().trim().max(120).optional().or(z.literal('')),
  propertyType: z.string().trim().max(100).optional().or(z.literal('')),
  message: z.string().trim().min(15).max(5000),
  website: z.string().max(0).optional().or(z.literal(''))
}).strict();

contactRouter.post('/', csrfProtection, validate(schema), async (req, res) => {
  const { name, company, email, phone, service, propertyType, message, website } = req.body;
  if (website) return success(res, null, 'Thank you for your enquiry.', 202);
  const request = await prisma.contactRequest.create({ data: { name, companyName: company || null, email, phone: phone || null, service: service || null, propertyType: propertyType || null, message } });
  return success(res, { id: request.id, status: request.status }, 'Enquiry received. Our team will be in touch.', 201);
});
