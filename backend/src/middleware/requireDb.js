import { isDbReady } from '../config/db.js';
import AppError from '../utils/AppError.js';

/** Short-circuits DB-backed routes with 503 instead of letting Mongoose buffer and time out. */
export default function requireDb(_req, _res, next) {
  if (!isDbReady()) return next(new AppError(503, 'The service is temporarily unavailable. Please try again shortly.'));
  return next();
}
