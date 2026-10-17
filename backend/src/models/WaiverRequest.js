import mongoose from 'mongoose';

/** These enums must match frontend/src/data/waiver.js */
export const AUTHOR_STATUSES = ['group_a', 'group_b', 'early_career', 'independent', 'other'];
export const WAIVER_TYPES = ['full', 'partial', 'assess'];
export const JOURNAL_TRACKS = ['medical', 'humanities', 'thesis'];

const waiverRequestSchema = new mongoose.Schema(
  {
    docket: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true },
    institution: { type: String, trim: true, maxlength: 300 },
    country: { type: String, required: true, trim: true, maxlength: 100 },
    authorStatus: { type: String, required: true, enum: AUTHOR_STATUSES },
    waiverType: { type: String, required: true, enum: WAIVER_TYPES },
    journalTrack: { type: String, required: true, enum: JOURNAL_TRACKS },
    manuscriptTitle: { type: String, required: true, trim: true, maxlength: 500 },
    manuscriptId: { type: String, trim: true, maxlength: 100 },
    justification: { type: String, required: true, trim: true, maxlength: 5000 },
    attachment: { mediaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' }, originalName: String, mimeType: String, size: Number },
    status: { type: String, enum: ['new', 'under_review', 'approved', 'partially_approved', 'declined'], default: 'new' },
  },
  { timestamps: true }
);

waiverRequestSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('WaiverRequest', waiverRequestSchema);
