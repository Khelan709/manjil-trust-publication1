import mongoose from 'mongoose';
import Media from '../models/Media.js';
import AppError from '../utils/AppError.js';
import { saveUpload } from '../utils/saveUpload.js';

const sendFile = (res, media, { inline, cache }) => {
  const safeName = media.filename.replace(/"/g, '');
  res.set({
    'Content-Type': media.mimeType,
    'Content-Length': media.data.length,
    'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename="${safeName}"`,
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'; sandbox",
    'Cache-Control': cache,
  });
  res.end(media.data);
};

/** GET /media/:id/:filename?  (public admin uploads only) */
export async function servePublicMedia(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) throw new AppError(404, 'File not found.');
  const media = await Media.findOne({ _id: req.params.id, isPublic: true }).select('+data');
  if (!media) throw new AppError(404, 'File not found.');
  sendFile(res, media, { inline: true, cache: 'public, max-age=31536000, immutable' });
}

/** POST /api/admin/media (multipart field "file") → { url, filename, size } */
export async function uploadAdminMedia(req, res) {
  if (!req.file) throw new AppError(400, 'Choose a file to upload.');
  const saved = await saveUpload(req.file, { kind: 'media', isPublic: true, uploadedBy: req.user.email });
  res.status(201).json({ url: `/media/${saved.id}/${encodeURIComponent(saved.filename)}`, filename: saved.filename, size: saved.size });
}

/** GET /api/admin/media/:id  (private form attachments, admin only) */
export async function downloadAttachment(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) throw new AppError(404, 'File not found.');
  const media = await Media.findById(req.params.id).select('+data');
  if (!media) throw new AppError(404, 'File not found.');
  sendFile(res, media, { inline: false, cache: 'private, no-store' });
}
