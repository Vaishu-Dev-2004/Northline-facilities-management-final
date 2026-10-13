import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(140),
  company: z.string().trim().min(2).max(180),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  password: z.string().min(12, 'Use at least 12 characters.').max(128),
  confirmPassword: z.string().min(1),
  termsAccepted: z.literal(true)
}).strict().refine((value) => value.password === value.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match.' });

export const loginSchema = z.object({ email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()), password: z.string().min(1).max(128) }).strict();
