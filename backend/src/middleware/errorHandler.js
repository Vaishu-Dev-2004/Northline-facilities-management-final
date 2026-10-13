import { Prisma } from '@prisma/client';
import { HttpError } from '../utils/httpError.js';

export function notFoundHandler(req, _res, next) {
  next(new HttpError(404, `Route ${req.method} ${req.path} was not found.`));
}

export function errorHandler(error, req, res, _next) {
  const requestId = req.id || 'untracked';
  if (error?.type === 'entity.parse.failed') return res.status(400).json({ success: false, message: 'Request body must be valid JSON.', errors: [], requestId });
  if (error?.type === 'entity.too.large') return res.status(413).json({ success: false, message: 'Request body is too large.', errors: [], requestId });
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(JSON.stringify({ level: 'error', requestId, code: error.code, route: req.path, message: 'Database request failed' }));
    if (error.code === 'P2002') return res.status(409).json({ success: false, message: 'A record with those details already exists.', errors: [] });
    if (error.code === 'P2025') return res.status(404).json({ success: false, message: 'The requested record was not found.', errors: [] });
  }
  const status = error instanceof HttpError ? error.status : 500;
  const message = error instanceof HttpError ? error.message : 'An unexpected error occurred. Please try again.';
  const errors = error instanceof HttpError ? error.errors : [];
  if (status >= 500) console.error(JSON.stringify({ level: 'error', requestId, route: req.path, method: req.method, message: error?.message || 'Unknown error' }));
  res.status(status).json({ success: false, message, errors, requestId });
}
