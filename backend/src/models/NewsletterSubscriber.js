import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    source: { type: String, trim: true, default: 'website' }, // which form: footer, home-banner, heritage-bulletin…
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('NewsletterSubscriber', subscriberSchema);
