import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';
import WaiverRequest from '../models/WaiverRequest.js';
import SampleRequest from '../models/SampleRequest.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import AppError from '../utils/AppError.js';
import { deleteUpload } from '../utils/saveUpload.js';

/** URL segment → model + the values `status` may take (subscribers use the boolean `active`). */
export const TYPES = {
  inquiries: { model: Inquiry, statuses: ['new', 'in_progress', 'resolved'] },
  waivers: { model: WaiverRequest, statuses: ['new', 'under_review', 'approved', 'partially_approved', 'declined'] },
  samples: { model: SampleRequest, statuses: ['new', 'dispatched', 'closed'] },
  subscribers: { model: NewsletterSubscriber, statuses: null },
};

const typeOf = (name) => {
  const t = TYPES[name];
  if (!t) throw new AppError(404, 'Unknown submission type.');
  return t;
};
const assertId = (id) => {
  if (!mongoose.isValidObjectId(id)) throw new AppError(404, 'Record not found.');
};

/** GET /api/admin/submissions/:type?page=1 → { items, total, page, pages, counts } */
export async function listSubmissions(req, res) {
  const { model } = typeOf(req.params.type);
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = 25;
  const [items, total] = await Promise.all([
    model.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    model.countDocuments(),
  ]);
  res.json({ items, total, page, pages: Math.max(1, Math.ceil(total / limit)) });
}

/** GET /api/admin/submissions → counts per type (dashboard badges) */
export async function submissionCounts(_req, res) {
  const entries = await Promise.all(Object.entries(TYPES).map(async ([k, t]) => [k, await t.model.countDocuments(k === 'subscribers' ? {} : { status: 'new' })]));
  res.json({ counts: Object.fromEntries(entries) });
}

/** PATCH /api/admin/submissions/:type/:id { status } | { active } */
export async function updateSubmission(req, res) {
  const { model, statuses } = typeOf(req.params.type);
  assertId(req.params.id);
  const update = {};
  if (statuses) {
    if (!statuses.includes(req.body?.status)) throw new AppError(400, 'Invalid status.');
    update.status = req.body.status;
  } else {
    if (typeof req.body?.active !== 'boolean') throw new AppError(400, 'Invalid value.');
    update.active = req.body.active;
  }
  const doc = await model.findByIdAndUpdate(req.params.id, update, { new: true }).lean();
  if (!doc) throw new AppError(404, 'Record not found.');
  res.json({ item: doc });
}

/** DELETE /api/admin/submissions/:type/:id (also removes any attached file) */
export async function deleteSubmission(req, res) {
  const { model } = typeOf(req.params.type);
  assertId(req.params.id);
  const doc = await model.findByIdAndDelete(req.params.id).lean();
  if (!doc) throw new AppError(404, 'Record not found.');
  await deleteUpload(doc.attachment?.mediaId);
  res.json({ message: 'Deleted.' });
}
