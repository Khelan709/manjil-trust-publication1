import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { uploadMedia } from '../middleware/upload.js';
import asyncHandler from '../utils/asyncHandler.js';
import { me, changePassword } from '../controllers/authController.js';
import { getContent, saveContent, resetContent } from '../controllers/contentController.js';
import { uploadAdminMedia, downloadAttachment } from '../controllers/mediaController.js';
import { listSubmissions, submissionCounts, updateSubmission, deleteSubmission } from '../controllers/submissionsController.js';
import { listUsers, createUser, deleteUser } from '../controllers/userController.js';

const router = Router();
router.use(requireAuth); // everything below needs a signed-in admin

router.get('/me', me);
router.post('/change-password', asyncHandler(changePassword));

router.get('/content/:key', asyncHandler(getContent));
router.put('/content/:key', asyncHandler(saveContent));
router.delete('/content/:key', asyncHandler(resetContent));

router.post('/media', uploadMedia, asyncHandler(uploadAdminMedia));
router.get('/media/:id', asyncHandler(downloadAttachment));

router.get('/submissions', asyncHandler(submissionCounts));
router.get('/submissions/:type', asyncHandler(listSubmissions));
router.patch('/submissions/:type/:id', asyncHandler(updateSubmission));
router.delete('/submissions/:type/:id', asyncHandler(deleteSubmission));

router.get('/users', asyncHandler(listUsers));
router.post('/users', asyncHandler(createUser));
router.delete('/users/:id', asyncHandler(deleteUser));

export default router;
