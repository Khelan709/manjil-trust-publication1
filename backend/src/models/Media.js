import mongoose from 'mongoose';

/**
 * Uploaded files live in MongoDB (not on disk) so they survive redeploys on hosts with ephemeral disks.
 *  - kind "media":      admin uploads (images, PDFs…) → public, served at /media/:id/:filename
 *  - kind "attachment": files sent through the contact / waiver forms → private, admin-only download
 */
const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true, maxlength: 200 },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true, select: false },
    kind: { type: String, enum: ['media', 'attachment'], required: true },
    isPublic: { type: Boolean, default: false },
    uploadedBy: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);
