import multer from 'multer';
import AppError from '../utils/AppError.js';
import { ADMIN_MEDIA_EXT, FORM_ATTACHMENT_EXT, extOf } from '../utils/fileTypes.js';

const MAX_BYTES = 15 * 1024 * 1024;

const make = (allowed, message, field) =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_BYTES, files: 1 },
    fileFilter: (_req, file, cb) => {
      const ok = allowed.includes(extOf(file.originalname));
      cb(ok ? null : new AppError(400, message), ok);
    },
  }).single(field);

/** Public contact / waiver forms: one optional `attachment` (PDF, DOCX, ZIP ≤ 15MB). */
export const uploadAttachment = make(FORM_ATTACHMENT_EXT, 'Only PDF, DOCX or ZIP attachments are accepted.', 'attachment');
/** Admin media library: one `file` (images, PDF, DOCX, XLSX, ZIP ≤ 15MB). */
export const uploadMedia = make(ADMIN_MEDIA_EXT, 'Unsupported file type. Allowed: PNG, JPG, WEBP, GIF, PDF, DOCX, XLSX, ZIP.', 'file');
