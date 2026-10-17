import { Router } from 'express';
import requireDb from '../middleware/requireDb.js';
import asyncHandler from '../utils/asyncHandler.js';
import { servePublicMedia } from '../controllers/mediaController.js';

const router = Router();
router.get('/:id/:filename?', requireDb, asyncHandler(servePublicMedia));
export default router;
