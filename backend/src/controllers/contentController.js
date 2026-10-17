import Content, { CONTENT_KEYS } from '../models/Content.js';
import AppError from '../utils/AppError.js';
import { assertSafeContent, isPlainObject } from '../utils/contentSafety.js';

const assertKey = (key) => {
  if (!CONTENT_KEYS.includes(key)) throw new AppError(404, 'Unknown content section.');
};

/** GET /api/content  → { content: { home: {...}, ... } }  (public: only what admins have edited) */
export async function listContent(_req, res) {
  const docs = await Content.find().lean();
  res.set('Cache-Control', 'no-cache');
  res.json({ content: Object.fromEntries(docs.map((d) => [d.key, d.data])) });
}

/** GET /api/admin/content/:key → { data, updatedAt, updatedBy } (data is null until first saved) */
export async function getContent(req, res) {
  assertKey(req.params.key);
  const doc = await Content.findOne({ key: req.params.key }).lean();
  res.json({ data: doc?.data ?? null, updatedAt: doc?.updatedAt ?? null, updatedBy: doc?.updatedBy ?? null });
}

/** PUT /api/admin/content/:key { data } */
export async function saveContent(req, res) {
  assertKey(req.params.key);
  const { data } = req.body || {};
  if (!isPlainObject(data)) throw new AppError(400, 'Content must be an object.');
  assertSafeContent(data);
  const doc = await Content.findOneAndUpdate(
    { key: req.params.key },
    { data, updatedBy: req.user.email },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
  ).lean();
  res.json({ message: 'Saved.', updatedAt: doc.updatedAt });
}

/** DELETE /api/admin/content/:key → back to the built-in defaults */
export async function resetContent(req, res) {
  assertKey(req.params.key);
  await Content.deleteOne({ key: req.params.key });
  res.json({ message: 'Reset to defaults.' });
}
