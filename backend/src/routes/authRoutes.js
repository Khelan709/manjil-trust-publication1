import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import requireDb from '../middleware/requireDb.js';
import asyncHandler from '../utils/asyncHandler.js';
import { login } from '../controllers/authController.js';

// Brute-force protection: 10 attempts per IP per 15 minutes.
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false, message: { message: 'Too many sign-in attempts. Try again in 15 minutes.' } });

const router = Router();
router.post('/login', loginLimiter, requireDb, asyncHandler(login));
export default router;
