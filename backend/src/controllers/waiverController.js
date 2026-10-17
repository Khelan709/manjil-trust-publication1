import WaiverRequest, { AUTHOR_STATUSES, JOURNAL_TRACKS, WAIVER_TYPES } from '../models/WaiverRequest.js';
import AppError from '../utils/AppError.js';
import { validate } from '../utils/validate.js';
import { makeDocket } from '../utils/docket.js';
import { saveUpload, deleteUpload } from '../utils/saveUpload.js';

const RULES = {
  fullName: { required: true, max: 200 },
  email: { required: true, type: 'email' },
  institution: { max: 300 },
  country: { required: true, max: 100 },
  authorStatus: { required: true, oneOf: AUTHOR_STATUSES },
  waiverType: { required: true, oneOf: WAIVER_TYPES },
  journalTrack: { required: true, oneOf: JOURNAL_TRACKS },
  manuscriptTitle: { required: true, max: 500 },
  manuscriptId: { max: 100 },
  justification: { required: true, max: 5000 },
};

/** POST /api/waiver-requests  (multipart/form-data, optional `attachment`) */
export async function createWaiverRequest(req, res) {
  const errors = validate(req.body, RULES);
  if (req.body.declaration !== 'true') errors.declaration = 'You must confirm the declaration.';
  if (Object.keys(errors).length) throw new AppError(400, 'Please correct the highlighted fields.', errors);

  const { fullName, email, institution, country, authorStatus, waiverType, journalTrack, manuscriptTitle, manuscriptId, justification } = req.body;
  const docket = makeDocket('MT-WVR');
  const file = req.file ? await saveUpload(req.file, { kind: 'attachment' }) : null;
  try {
    await WaiverRequest.create({
      docket, fullName, email, institution, country, authorStatus, waiverType, journalTrack, manuscriptTitle, manuscriptId, justification,
      attachment: file && { mediaId: file.id, originalName: file.filename, mimeType: file.mimeType, size: file.size },
    });
  } catch (err) {
    await deleteUpload(file?.id);
    throw err;
  }
  // TODO: email the editorial office and send the applicant an acknowledgement.
  res.status(201).json({ message: 'Waiver request registered.', docket: `#${docket}` });
}
