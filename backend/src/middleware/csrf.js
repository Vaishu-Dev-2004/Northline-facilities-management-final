import { randomBytes, timingSafeEqual } from 'node:crypto';
import { HttpError } from '../utils/httpError.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export function issueCsrfToken(req, res) {
  if (!req.session.csrfToken) req.session.csrfToken = randomBytes(32).toString('hex');
  res.json({ success: true, data: { csrfToken: req.session.csrfToken }, message: 'CSRF token issued.' });
}

export function csrfProtection(req, _res, next) {
  if (SAFE_METHODS.has(req.method)) return next();
  const expected = req.session?.csrfToken;
  const supplied = req.get('X-CSRF-Token');
  if (typeof expected !== 'string' || typeof supplied !== 'string') return next(new HttpError(403, 'Request verification failed. Refresh and try again.'));
  const left = Buffer.from(expected);
  const right = Buffer.from(supplied);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return next(new HttpError(403, 'Request verification failed. Refresh and try again.'));
  next();
}
