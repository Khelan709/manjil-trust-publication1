import { Router } from 'express';
import requireDb from '../middleware/requireDb.js';
import asyncHandler from '../utils/asyncHandler.js';
import { createSampleRequest } from '../controllers/sampleRequestController.js';

const router = Router();
router.post('/', requireDb, asyncHandler(createSampleRequest));
export default router;
