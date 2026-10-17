import { Router } from 'express';
import requireDb from '../middleware/requireDb.js';
import { uploadAttachment } from '../middleware/upload.js';
import asyncHandler from '../utils/asyncHandler.js';
import { createWaiverRequest } from '../controllers/waiverController.js';

const router = Router();
// requireDb first so no file is written for a request we cannot store.
router.post('/', requireDb, uploadAttachment, asyncHandler(createWaiverRequest));
export default router;
