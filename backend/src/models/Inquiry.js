import mongoose from 'mongoose';

/** Must match INQUIRY_CATEGORIES in frontend/src/data/contact.js */
export const INQUIRY_CATEGORIES = ['status', 'monograph', 'oa', 'editorial', 'library', 'fair', 'general'];

const inquirySchema = new mongoose.Schema(
  {
    docket: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, trim: true, maxlength: 200 },
    affiliation: { type: String, required: true, trim: true, maxlength: 300 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, maxlength: 40 },
    category: { type: String, required: true, enum: INQUIRY_CATEGORIES },
    subject: { type: String, required: true, trim: true, maxlength: 300 },
    message: { type: String, required: true, trim: true, maxlength: 10000 },
    attachment: { mediaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' }, originalName: String, mimeType: String, size: Number },
    status: { type: String, enum: ['new', 'in_progress', 'resolved'], default: 'new' },
  },
  { timestamps: true }
);

inquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Inquiry', inquirySchema);
