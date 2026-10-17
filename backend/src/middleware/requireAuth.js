import { isDbReady } from '../config/db.js';
import AdminUser from '../models/AdminUser.js';
import AppError from '../utils/AppError.js';
import { verifyToken } from '../utils/token.js';

/** Requires `Authorization: Bearer <jwt>` from a currently existing admin. Sets req.user. */
export default async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) throw new AppError(401, 'Please sign in.');
    let payload;
    try {
      payload = verifyToken(token);
    } catch {
      throw new AppError(401, 'Your session has expired. Please sign in again.');
    }
    if (!isDbReady()) throw new AppError(503, 'The service is temporarily unavailable. Please try again shortly.');
    const user = await AdminUser.findById(payload.sub).lean();
    if (!user) throw new AppError(401, 'This account no longer exists.');
    req.user = { id: String(user._id), email: user.email, name: user.name };
    next();
  } catch (err) {
    next(err);
  }
}
