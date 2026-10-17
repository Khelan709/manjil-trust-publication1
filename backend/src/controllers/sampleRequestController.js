import SampleRequest, { SAMPLE_DISCIPLINES } from '../models/SampleRequest.js';
import AppError from '../utils/AppError.js';
import { validate } from '../utils/validate.js';

const RULES = {
  institution: { required: true, max: 300 },
  designation: { required: true, max: 200 },
  email: { required: true, type: 'email' },
  discipline: { required: true, oneOf: SAMPLE_DISCIPLINES },
  address: { required: true, max: 1000 },
};

/** POST /api/sample-requests */
export async function createSampleRequest(req, res) {
  const errors = validate(req.body, RULES);
  if (Object.keys(errors).length) throw new AppError(400, 'Please correct the highlighted fields.', errors);
  const { institution, designation, email, discipline, address } = req.body;
  await SampleRequest.create({ institution, designation, email, discipline, address });
  res.status(201).json({ message: 'Request submitted successfully. Our circulation department will contact your institution within 48 hours.' });
}
