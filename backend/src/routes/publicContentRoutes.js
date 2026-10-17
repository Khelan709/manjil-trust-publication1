import { Router } from 'express';
import requireDb from '../middleware/requireDb.js';
import asyncHandler from '../utils/asyncHandler.js';
import { listContent } from '../controllers/contentController.js';

const router = Router();
router.get('/', requireDb, asyncHandler(listContent));
export default router;
