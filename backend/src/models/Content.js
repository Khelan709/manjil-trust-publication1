import mongoose from 'mongoose';

/** Must match the keys of DEFAULT_CONTENT in frontend/src/data/defaults.js */
export const CONTENT_KEYS = ['settings', 'images', 'faqs', 'home', 'about', 'contact', 'openAccess', 'resources', 'waiver'];

/**
 * One document per editable area of the website. `data` holds the admin's saved version of the
 * whole area; the frontend deep-merges it over the built-in defaults.
 */
const contentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, enum: CONTENT_KEYS },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    updatedBy: { type: String },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model('Content', contentSchema);
