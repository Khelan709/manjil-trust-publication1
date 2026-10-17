import Inquiry, { INQUIRY_CATEGORIES } from '../models/Inquiry.js';
import AppError from '../utils/AppError.js';
import { validate } from '../utils/validate.js';
import { makeDocket } from '../utils/docket.js';
import { saveUpload, deleteUpload } from '../utils/saveUpload.js';

const RULES = {
  fullName: { required: true, max: 200 },
  affiliation: { required: true, max: 300 },
  email: { required: true, type: 'email' },
  phone: { max: 40 },
  category: { required: true, oneOf: INQUIRY_CATEGORIES },
  subject: { required: true, max: 300 },
  message: { required: true, max: 10000 },
};

/** POST /api/contact  (multipart/form-data, optional `attachment`) */
export async function createInquiry(req, res) {
  const errors = validate(req.body, RULES);
  if (Object.keys(errors).length) throw new AppError(400, 'Please correct the highlighted fields.', errors);

  const { fullName, affiliation, email, phone, category, subject, message } = req.body;
  const docket = makeDocket('MT-INQ');
  const file = req.file ? await saveUpload(req.file, { kind: 'attachment' }) : null;
  try {
    await Inquiry.create({
      docket, fullName, affiliation, email, phone, category, subject, message,
      attachment: file && { mediaId: file.id, originalName: file.filename, mimeType: file.mimeType, size: file.size },
    });
  } catch (err) {
    await deleteUpload(file?.id); // do not leave an orphaned file when the inquiry was not stored
    throw err;
  }
  // TODO: notify the relevant desk by email (see README → Next steps).
  res.status(201).json({ message: 'Inquiry registered.', docket: `#${docket}` });
}
