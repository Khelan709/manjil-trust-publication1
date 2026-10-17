/**
 * Create (or reset the password of) an admin account.
 *   npm run create-admin -- you@example.com "a-long-password" "Your Name"
 */
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import env from '../src/config/env.js';
import AdminUser from '../src/models/AdminUser.js';
import { isEmail } from '../src/utils/validate.js';

const [email, password, name = ''] = process.argv.slice(2);
if (!isEmail(email) || !password || password.length < 10) {
  console.error('Usage: npm run create-admin -- <email> <password (10+ chars)> [name]');
  process.exit(1);
}
await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 5000 });
const passwordHash = await bcrypt.hash(password, 12);
const existing = await AdminUser.findOne({ email: email.toLowerCase() });
if (existing) {
  existing.passwordHash = passwordHash;
  await existing.save();
  console.log(`Password updated for ${email}`);
} else {
  await AdminUser.create({ email, name, passwordHash });
  console.log(`Admin created: ${email}`);
}
await mongoose.disconnect();
