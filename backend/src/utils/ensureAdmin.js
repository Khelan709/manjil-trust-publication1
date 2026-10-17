import bcrypt from 'bcryptjs';
import env from '../config/env.js';
import { isDbReady } from '../config/db.js';
import AdminUser from '../models/AdminUser.js';
import { isEmail } from './validate.js';

/**
 * If no admin exists yet and ADMIN_EMAIL / ADMIN_PASSWORD are set, create the first admin.
 * (Handy on hosts without a shell, e.g. free Render.) A no-op once any admin exists.
 */
export async function ensureAdminFromEnv() {
  if (!isDbReady() || !env.adminEmail || !env.adminPassword) return;
  if (!isEmail(env.adminEmail) || env.adminPassword.length < 10) {
    console.warn('[admin] ADMIN_EMAIL / ADMIN_PASSWORD ignored: need a valid email and a password of at least 10 characters.');
    return;
  }
  if ((await AdminUser.countDocuments()) > 0) return;
  await AdminUser.create({ email: env.adminEmail, name: 'Administrator', passwordHash: await bcrypt.hash(env.adminPassword, 12) });
  console.log(`[admin] Created first admin account: ${env.adminEmail}`);
}
