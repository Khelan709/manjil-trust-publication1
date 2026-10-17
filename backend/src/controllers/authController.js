import bcrypt from 'bcryptjs';
import AdminUser from '../models/AdminUser.js';
import AppError from '../utils/AppError.js';
import { isEmail } from '../utils/validate.js';
import { signToken } from '../utils/token.js';

export const MIN_PASSWORD = 10;
// Compared against when the email is unknown so response time doesn't reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12);

/** POST /api/auth/login { email, password } */
export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!isEmail(email) || typeof password !== 'string' || !password) throw new AppError(400, 'Enter your email and password.');
  const user = await AdminUser.findOne({ email: email.trim().toLowerCase() }).select('+passwordHash');
  const ok = await bcrypt.compare(password, user?.passwordHash || DUMMY_HASH);
  if (!user || !ok) throw new AppError(401, 'Incorrect email or password.');
  user.lastLoginAt = new Date();
  await user.save();
  res.json({ token: signToken(user), user: { id: user._id, email: user.email, name: user.name } });
}

/** GET /api/admin/me */
export const me = (req, res) => res.json({ user: req.user });

/** POST /api/admin/change-password { currentPassword, newPassword } */
export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body || {};
  if (typeof newPassword !== 'string' || newPassword.length < MIN_PASSWORD) {
    throw new AppError(400, `New password must be at least ${MIN_PASSWORD} characters.`);
  }
  const user = await AdminUser.findById(req.user.id).select('+passwordHash');
  if (!user || !(await bcrypt.compare(String(currentPassword || ''), user.passwordHash))) {
    throw new AppError(400, 'Current password is incorrect.');
  }
  user.passwordHash = await bcrypt.hash(newPassword, 12);
  await user.save();
  res.json({ message: 'Password updated.' });
}
