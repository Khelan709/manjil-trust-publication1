/** Allowed upload types. The MIME type we store/serve comes from the extension (never the client), and the file's first bytes must match. */
export const TYPES = {
  pdf:  { mime: 'application/pdf', sig: (b) => b.subarray(0, 4).toString('latin1') === '%PDF' },
  docx: { mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', sig: (b) => b[0] === 0x50 && b[1] === 0x4b },
  xlsx: { mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', sig: (b) => b[0] === 0x50 && b[1] === 0x4b },
  zip:  { mime: 'application/zip', sig: (b) => b[0] === 0x50 && b[1] === 0x4b },
  png:  { mime: 'image/png', sig: (b) => b[0] === 0x89 && b.subarray(1, 4).toString('latin1') === 'PNG' },
  jpg:  { mime: 'image/jpeg', sig: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  jpeg: { mime: 'image/jpeg', sig: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  webp: { mime: 'image/webp', sig: (b) => b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP' },
  gif:  { mime: 'image/gif', sig: (b) => b.subarray(0, 3).toString('latin1') === 'GIF' },
};

export const FORM_ATTACHMENT_EXT = ['pdf', 'docx', 'zip'];
export const ADMIN_MEDIA_EXT = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'pdf', 'docx', 'xlsx', 'zip'];

export const extOf = (name = '') => (name.includes('.') ? name.split('.').pop().toLowerCase() : '');

/** true when `buffer` really looks like the type its extension claims */
export const signatureMatches = (ext, buffer) => Boolean(TYPES[ext] && buffer?.length > 12 && TYPES[ext].sig(buffer));
export const mimeFor = (ext) => TYPES[ext]?.mime || 'application/octet-stream';
