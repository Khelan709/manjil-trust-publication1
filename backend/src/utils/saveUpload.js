import Media from '../models/Media.js';
import AppError from './AppError.js';
import { extOf, mimeFor, signatureMatches } from './fileTypes.js';

const cleanName = (n) => n.replace(/[^\w.\- ]+/g, '_').slice(-120) || 'file';

/** Stores a multer memory file in MongoDB. Returns the saved Media document (without the bytes). */
export async function saveUpload(file, { kind, isPublic = false, uploadedBy }) {
  const ext = extOf(file.originalname);
  if (!signatureMatches(ext, file.buffer)) {
    throw new AppError(400, 'The file content does not match its type. Please upload a valid file.');
  }
  const media = await Media.create({
    filename: cleanName(file.originalname),
    mimeType: mimeFor(ext),
    size: file.size,
    data: file.buffer,
    kind,
    isPublic,
    uploadedBy,
  });
  return { id: media._id, filename: media.filename, mimeType: media.mimeType, size: media.size };
}

export const deleteUpload = (id) => (id ? Media.deleteOne({ _id: id }).catch(() => {}) : Promise.resolve());
