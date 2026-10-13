import { Router } from 'express';
import argon2 from 'argon2';
import { createHash, randomBytes } from 'node:crypto';
import { prisma } from '../config/database.js';
import { csrfProtection, issueCsrfToken } from '../middleware/csrf.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validators/auth.js';
import { z } from 'zod';
import { HttpError } from '../utils/httpError.js';
import { success } from '../utils/respond.js';

export const authRouter = Router();
const cookieName = process.env.SESSION_COOKIE_NAME || 'northline.sid';
const tokenHash = (token) => createHash('sha256').update(token).digest('hex');
const resetSchema = z.object({ token: z.string().min(32).max(256), password: z.string().min(12).max(128) }).strict();
const verifySchema = z.object({ token: z.string().min(32).max(256) }).strict();
const forgotSchema = z.object({ email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()) }).strict();

function regenerateSession(req) {
  return new Promise((resolve, reject) => req.session.regenerate((error) => error ? reject(error) : resolve()));
}
function saveSession(req) {
  return new Promise((resolve, reject) => req.session.save((error) => error ? reject(error) : resolve()));
}
async function securityEvent(req, eventType, result, userId = null) {
  try {
    await prisma.securityEvent.create({ data: {
      userId,
      eventType,
      result,
      ipAddress: req.ip || null,
      userAgent: String(req.get('user-agent') || '').slice(0, 300) || null
    } });
  } catch (error) {
    console.error(JSON.stringify({ level: 'error', event: 'security_event.write_failed', requestId: req.id, message: error.message }));
  }
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role.name, companyId: user.companyId, company: user.company?.name || null };
}

// Fetch once per browser session; include this token as X-CSRF-Token on every mutation.
authRouter.get('/csrf', issueCsrfToken);

authRouter.post('/register', csrfProtection, validate(registerSchema), async (req, res) => {
  const { name, company, email, phone, password } = req.body;
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) throw new HttpError(409, 'An account with that email already exists.');
  const role = await prisma.role.findUnique({ where: { name: 'CLIENT' } });
  if (!role) throw new HttpError(503, 'Client registration is not configured. Please contact support.');

  const passwordHash = await argon2.hash(password, { type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1 });
  const verificationToken = randomBytes(32).toString('base64url');
  const created = await prisma.$transaction(async (tx) => {
    const clientCompany = await tx.company.create({ data: { name: company, status: 'PENDING_VERIFICATION' } });
    const client = await tx.client.create({ data: { companyId: clientCompany.id } });
    const user = await tx.user.create({ data: {
      email, name, phone: phone || null, passwordHash, roleId: role.id, companyId: clientCompany.id, status: 'INVITED'
    }, include: { role: true, company: true } });
    await tx.emailVerificationToken.create({ data: { userId: user.id, tokenHash: tokenHash(verificationToken), expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) } });
    await tx.auditLog.create({ data: { actorId: user.id, action: 'account.registration_requested', entityType: 'User', entityId: user.id, result: 'PENDING', ipAddress: req.ip || null } });
    return { user, clientId: client.id };
  });
  await securityEvent(req, 'account.registration', 'PENDING', created.user.id);
  // The verification token is intentionally never returned in an API response or log.
  // Deliver it through a configured, rate-limited transactional-email provider before launch.
  return success(res, { account: publicUser(created.user), status: 'PENDING_VERIFICATION' }, 'Account request recorded. Email verification delivery must be configured before activation.', 201);
});

authRouter.post('/login', csrfProtection, validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email }, include: { role: true, company: true } });
  const passwordOk = user?.passwordHash ? await argon2.verify(user.passwordHash, password).catch(() => false) : false;
  if (!user || !passwordOk || user.status !== 'ACTIVE' || !user.emailVerifiedAt || user.deletedAt) {
    await securityEvent(req, 'auth.login', 'FAILED', user?.id || null);
    throw new HttpError(401, 'Email or password is incorrect, or the account is not active.');
  }
  await regenerateSession(req);
  req.session.userId = user.id;
  req.session.csrfToken = randomBytes(32).toString('hex');
  req.session.authenticatedAt = Date.now();
  await saveSession(req);
  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } }),
    prisma.auditLog.create({ data: { actorId: user.id, action: 'auth.login', entityType: 'User', entityId: user.id, ipAddress: req.ip || null } })
  ]);
  await securityEvent(req, 'auth.login', 'SUCCESS', user.id);
  return success(res, { user: publicUser(user), csrfToken: req.session.csrfToken }, 'Signed in successfully.');
});

authRouter.post('/logout', csrfProtection, async (req, res, next) => {
  const userId = req.session?.userId || null;
  req.session.destroy(async (error) => {
    if (error) return next(error);
    res.clearCookie(cookieName, { httpOnly: true, sameSite: process.env.SESSION_SAME_SITE || 'lax', secure: process.env.SESSION_SECURE === 'true', path: '/' });
    if (userId) {
      try {
        await prisma.auditLog.create({ data: { actorId: userId, action: 'auth.logout', entityType: 'User', entityId: userId, ipAddress: req.ip || null } });
        await securityEvent(req, 'auth.logout', 'SUCCESS', userId);
      } catch (logError) { console.error(JSON.stringify({ level: 'error', requestId: req.id, message: 'Logout audit write failed' })); }
    }
    return success(res, null, 'Signed out successfully.');
  });
});

authRouter.get('/me', requireAuth, async (req, res) => success(res, { user: req.user }, 'Current account loaded.'));

authRouter.post('/forgot-password', csrfProtection, validate(forgotSchema), async (req, res) => {
  const user = await prisma.user.findUnique({ where: { email: req.body.email }, select: { id: true, status: true } });
  if (user && user.status === 'ACTIVE') {
    const token = randomBytes(32).toString('base64url');
    await prisma.passwordResetToken.create({ data: { userId: user.id, tokenHash: tokenHash(token), expiresAt: new Date(Date.now() + 30 * 60 * 1000) } });
    // Do not return or log the reset token. Configure a transactional email provider.
    await securityEvent(req, 'auth.password_reset.requested', 'PENDING', user.id);
  }
  return success(res, null, 'If an eligible account exists, password reset instructions will be sent.', 202);
});

authRouter.post('/reset-password', csrfProtection, validate(resetSchema), async (req, res) => {
  const { token, password } = req.body;
  const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash: tokenHash(token) }, include: { user: { select: { id: true, status: true } } } });
  if (!record || record.usedAt || record.expiresAt < new Date() || record.user.status !== 'ACTIVE') throw new HttpError(400, 'This reset link is invalid or has expired.');
  const passwordHash = await argon2.hash(password, { type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1 });
  await prisma.$transaction(async (tx) => {
    await tx.user.update({ where: { id: record.userId }, data: { passwordHash } });
    await tx.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } });
    await tx.passwordResetToken.updateMany({ where: { userId: record.userId, usedAt: null }, data: { usedAt: new Date() } });
    await tx.$executeRaw`DELETE FROM "session" WHERE sess->>'userId' = ${record.userId}`;
    await tx.auditLog.create({ data: { actorId: record.userId, action: 'auth.password_reset.completed', entityType: 'User', entityId: record.userId, ipAddress: req.ip || null } });
  });
  await securityEvent(req, 'auth.password_reset.completed', 'SUCCESS', record.userId);
  return success(res, null, 'Password updated. Sign in again to continue.');
});

authRouter.post('/verify-email', csrfProtection, validate(verifySchema), async (req, res) => {
  const record = await prisma.emailVerificationToken.findUnique({ where: { tokenHash: tokenHash(req.body.token) } });
  if (!record || record.usedAt || record.expiresAt < new Date()) throw new HttpError(400, 'This verification link is invalid or has expired.');
  await prisma.$transaction(async (tx) => {
    await tx.emailVerificationToken.update({ where: { id: record.id }, data: { usedAt: new Date() } });
    await tx.user.update({ where: { id: record.userId }, data: { emailVerifiedAt: new Date(), status: 'ACTIVE' } });
    await tx.auditLog.create({ data: { actorId: record.userId, action: 'auth.email_verified', entityType: 'User', entityId: record.userId, ipAddress: req.ip || null } });
  });
  await securityEvent(req, 'auth.email_verified', 'SUCCESS', record.userId);
  return success(res, null, 'Email verified. You can now sign in.');
});
