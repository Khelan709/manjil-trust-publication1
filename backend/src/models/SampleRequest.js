import mongoose from 'mongoose';

/** Must match SAMPLE_DISCIPLINES in frontend/src/data/resources.js */
export const SAMPLE_DISCIPLINES = [
  'All Disciplinary Imprints (Comprehensive)',
  'Clinical Health Sciences & Oncology',
  'South Asian Archeology & Heritage Studies',
  'Economics & Quantitative Social Dynamics',
];

const sampleRequestSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true, trim: true, maxlength: 300 },
    designation: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true },
    discipline: { type: String, required: true, enum: SAMPLE_DISCIPLINES },
    address: { type: String, required: true, trim: true, maxlength: 1000 },
    status: { type: String, enum: ['new', 'dispatched', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.model('SampleRequest', sampleRequestSchema);
