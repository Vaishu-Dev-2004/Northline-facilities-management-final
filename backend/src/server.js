import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';
import { randomUUID } from 'node:crypto';
import { rateLimit } from 'express-rate-limit';
import { apiRouter } from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { prisma } from './config/database.js';
import { success } from './utils/respond.js';
import { HttpError } from './utils/httpError.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 4000);
const origin = process.env.APP_ORIGIN;
const sessionSecret = process.env.SESSION_SECRET;
const sessionCookieName = process.env.SESSION_COOKIE_NAME || 'northline.sid';

if (!origin) throw new Error('APP_ORIGIN is required. Set it to the exact trusted frontend origin.');
if (!sessionSecret || sessionSecret.length < 32) throw new Error('SESSION_SECRET must be set to a random value of at least 32 characters.');
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required to start the API.');

const trustProxy = Number(process.env.TRUST_PROXY || 0);
if (!Number.isInteger(trustProxy) || trustProxy < 0 || trustProxy > 10) throw new Error('TRUST_PROXY must be an integer between 0 and 10.');
if (trustProxy > 0) app.set('trust proxy', trustProxy);
app.disable('x-powered-by');

const dbPool = new Pool({ connectionString: process.env.DATABASE_URL, max: 12, idleTimeoutMillis: 30000, connectionTimeoutMillis: 5000 });
const PgSessionStore = connectPgSimple(session);
const sessionStore = new PgSessionStore({ pool: dbPool, tableName: 'session', createTableIfMissing: false, pruneSessionInterval: 15 * 60, errorLog: (error) => console.error(JSON.stringify({ level: 'error', event: 'session_store.error', message: error.message })) });

app.use((req, res, next) => {
  req.id = randomUUID();
  const started = Date.now();
  res.setHeader('X-Request-Id', req.id);
  res.on('finish', () => console.info(JSON.stringify({ level: 'info', requestId: req.id, method: req.method, path: req.path, status: res.statusCode, durationMs: Date.now() - started })));
  next();
});
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'data:'],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      imgSrc: ["'self'", 'data:', 'blob:'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'"],
      upgradeInsecureRequests: isProduction ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  frameguard: { action: 'deny' }
}));
app.use(cors({
  origin(requestOrigin, callback) {
    if (!requestOrigin || requestOrigin === origin) return callback(null, true);
    return callback(new HttpError(403, 'Origin is not allowed by CORS.'));
  },
  credentials: true,
  methods: ['GET','POST','PATCH','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','X-CSRF-Token','X-Request-Id'],
  maxAge: 600
}));
app.use(express.json({ limit: '100kb', strict: true }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use(session({
  name: sessionCookieName,
  store: sessionStore,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === 'true' || isProduction,
    sameSite: process.env.SESSION_SAME_SITE || 'lax',
    maxAge: 8 * 60 * 60 * 1000,
    path: '/'
  }
}));

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false, message: { success: false, message: 'Too many requests. Please try again shortly.', errors: [] } });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 12, standardHeaders: 'draft-7', legacyHeaders: false, message: { success: false, message: 'Too many authentication attempts. Please try again later.', errors: [] } });
app.use('/api/v1/auth', authLimiter);
app.use('/api/v1/contact', rateLimit({ windowMs: 60 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false, message: { success: false, message: 'Too many enquiries. Please try again later.', errors: [] } }));
app.use('/api/v1', apiLimiter);

app.get('/health', (_req, res) => success(res, { status: 'ok' }, 'Service is running.'));
app.get('/ready', async (_req, res, next) => {
  try { await prisma.$queryRaw`SELECT 1`; return success(res, { status: 'ready' }, 'Database connection is ready.'); }
  catch (error) { next(error); }
});
app.use('/api/v1', apiRouter);
app.use('/api', notFoundHandler);
app.use((_req, _res, next) => next(new HttpError(404, 'The requested resource was not found.')));
app.use(errorHandler);

const server = app.listen(port, '0.0.0.0', () => console.info(JSON.stringify({ level: 'info', event: 'server.started', port, environment: process.env.NODE_ENV || 'development' })));

async function shutdown(signal) {
  console.info(JSON.stringify({ level: 'info', event: 'server.shutdown', signal }));
  server.close(async () => {
    await prisma.$disconnect();
    await sessionStore.close?.();
    await dbPool.end();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
