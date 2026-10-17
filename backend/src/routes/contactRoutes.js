import { Router } from 'express';
import requireDb from '../middleware/requireDb.js';
import { uploadAttachment } from '../middleware/upload.js';
import asyncHandler from '../utils/asyncHandler.js';
import { createInquiry } from '../controllers/contactController.js';

const router = Router();
// requireDb runs first so no file is written to disk for a request we cannot store;
// multer then parses the multipart body before validation.
router.post('/', requireDb, uploadAttachment, asyncHandler(createInquiry));
export default router;
