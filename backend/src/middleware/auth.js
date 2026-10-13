import { prisma } from '../config/database.js';
import { HttpError } from '../utils/httpError.js';

export async function requireAuth(req, _res, next) {
  try {
    if (!req.session?.userId) throw new HttpError(401, 'Sign in to continue.');
    const user = await prisma.user.findFirst({
      where: { id: req.session.userId, status: 'ACTIVE', deletedAt: null },
      select: { id: true, email: true, name: true, phone: true, status: true, roleId: true, companyId: true, role: { select: { name: true } } }
    });
    if (!user) {
      req.session.destroy(() => {});
      throw new HttpError(401, 'Your session is no longer active. Sign in again.');
    }
    req.user = user;
    next();
  } catch (error) { next(error); }
}

export function requireRole(...roles) {
  const allowed = new Set(roles.map((role) => role.toUpperCase()));
  return (req, _res, next) => {
    if (!req.user || !allowed.has(req.user.role.name.toUpperCase())) return next(new HttpError(403, 'You do not have permission to perform this action.'));
    next();
  };
}

export function requirePermission(permission) {
  return async (req, _res, next) => {
    try {
      const role = await prisma.role.findUnique({ where: { id: req.user.roleId }, include: { permissions: { include: { permission: true } } } });
      const allowed = role?.permissions.some((item) => item.permission.key === permission);
      if (!allowed) throw new HttpError(403, 'You do not have permission to perform this action.');
      next();
    } catch (error) { next(error); }
  };
}
