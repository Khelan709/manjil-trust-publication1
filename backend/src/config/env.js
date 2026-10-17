import 'dotenv/config';

const nodeEnv = process.env.NODE_ENV || 'development';
const jwtSecret = process.env.JWT_SECRET || '';

// A weak/missing signing secret would let anyone forge admin tokens, so refuse to boot in production.
if (nodeEnv === 'production' && (jwtSecret.length < 32 || jwtSecret === 'change-me-in-production')) {
  throw new Error('JWT_SECRET must be set to a random string of at least 32 characters in production.');
}

const env = {
  nodeEnv,
  port: Number(process.env.PORT) || 5000,
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim()),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/manjil_publication',
  jwtSecret: jwtSecret.length >= 16 ? jwtSecret : 'dev-only-secret-do-not-use-in-production',
  jwtExpiresIn: '8h',
  adminEmail: (process.env.ADMIN_EMAIL || '').trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || '',
  serveFrontend: process.env.SERVE_FRONTEND === 'true',
  trustProxy: Number(process.env.TRUST_PROXY) || 0,
};

export default env;
