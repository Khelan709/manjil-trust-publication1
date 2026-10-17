import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import AppError from '../utils/AppError.js';
import { isEmail } from '../utils/validate.js';

/** POST /api/newsletter  { email, source? } — idempotent: re-subscribing succeeds quietly. */
export async function subscribe(req, res) {
  const { email, source } = req.body || {};
  if (!isEmail(email)) throw new AppError(400, 'Please enter a valid email address.');
  const cleanSource = typeof source === 'string' ? source.slice(0, 50) : 'website';
  await NewsletterSubscriber.updateOne(
    { email: email.trim().toLowerCase() },
    { $setOnInsert: { source: cleanSource }, $set: { active: true } },
    { upsert: true }
  );
  res.status(201).json({ message: 'Thank you for subscribing to the Manjil Academic Dispatch.' });
}
