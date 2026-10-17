import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser.js';
import AppError from '../utils/AppError.js';
import { isEmail } from '../utils/validate.js';
import { MIN_PASSWORD } from './authController.js';

/** GET /api/admin/users */
export async function listUsers(_req, res) {
  res.json({ users: await AdminUser.find().sort({ createdAt: 1 }).lean() });
}

/** POST /api/admin/users { email, name?, password } */
export async function createUser(req, res) {
  const { email, name, password } = req.body || {};
  if (!isEmail(email)) throw new AppError(400, 'Enter a valid email address.');
  if (typeof password !== 'string' || password.length < MIN_PASSWORD) throw new AppError(400, `Password must be at least ${MIN_PASSWORD} characters.`);
  const user = await AdminUser.create({
    email: email.trim().toLowerCase(),
    name: typeof name === 'string' ? name.trim().slice(0, 100) : '',
    passwordHash: await bcrypt.hash(password, 12),
  });
  res.status(201).json({ user: { _id: user._id, email: user.email, name: user.name, createdAt: user.createdAt } });
}

/** DELETE /api/admin/users/:id  (you cannot delete yourself or the last admin) */
export async function deleteUser(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) throw new AppError(404, 'User not found.');
  if (id === req.user.id) throw new AppError(400, 'You cannot delete your own account.');
  if ((await AdminUser.countDocuments()) <= 1) throw new AppError(400, 'At least one admin must remain.');
  const gone = await AdminUser.findByIdAndDelete(id);
  if (!gone) throw new AppError(404, 'User not found.');
  res.json({ message: 'User deleted.' });
}
