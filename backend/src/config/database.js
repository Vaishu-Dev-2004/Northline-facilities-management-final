import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
export const prisma = globalForPrisma.__northlinePrisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
});
if (process.env.NODE_ENV !== 'production') globalForPrisma.__northlinePrisma = prisma;
