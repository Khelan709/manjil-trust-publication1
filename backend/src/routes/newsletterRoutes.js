import { Router } from 'express';
import requireDb from '../middleware/requireDb.js';
import asyncHandler from '../utils/asyncHandler.js';
import { subscribe } from '../controllers/newsletterController.js';

const router = Router();
router.post('/', requireDb, asyncHandler(subscribe));
export default router;
