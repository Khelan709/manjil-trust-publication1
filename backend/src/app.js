import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import env from './config/env.js';
import routes from './routes/index.js';
import mediaRoutes from './routes/mediaRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
if (env.trustProxy) app.set('trust proxy', env.trustProxy);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        // 'unsafe-inline' for styles only: React sets inline style attributes. Scripts stay locked down.
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
  })
);
app.use(cors({ origin: env.corsOrigins }));
app.use(express.json({ limit: '1mb' }));
if (env.nodeEnv !== 'test') app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

// Form endpoints are the abuse surface: limit POSTs per IP.
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false, skip: (req) => req.method === 'GET' || req.originalUrl.startsWith('/api/admin') }));

app.use('/api', routes);
app.use('/media', mediaRoutes);

// Optionally serve the built website so one deployment hosts everything.
const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../frontend/dist');
if (env.serveFrontend && fs.existsSync(path.join(distDir, 'index.html'))) {
  app.use(express.static(distDir, { index: false, maxAge: '1h', setHeaders: (res, file) => file.includes(`${path.sep}assets${path.sep}`) && res.set('Cache-Control', 'public, max-age=31536000, immutable') }));
  // Single-page-app fallback: page-like GETs (no file extension) return index.html and React Router takes over.
  // Missing files (e.g. /assets/old.js) correctly 404 instead of returning HTML.
  app.get(/^\/(?!api\/|media\/|assets\/)[^.]*$/, (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
} else if (env.serveFrontend) {
  console.warn('[server] SERVE_FRONTEND is true but frontend/dist was not found. Run "npm run build" first.');
}

app.use(notFound);
app.use(errorHandler);

export default app;
