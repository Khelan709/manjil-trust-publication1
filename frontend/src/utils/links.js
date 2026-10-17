/** Only these URL shapes may reach an href: http(s), mailto, tel, in-site paths, #anchors. Anything else becomes "#". */
export function safeUrl(url) {
  if (typeof url !== 'string') return '#';
  const u = url.trim();
  if (/^(https?:\/\/|mailto:|tel:)/i.test(u)) return u;
  if ((u.startsWith('/') && !u.startsWith('//')) || u.startsWith('#')) return u;
  return '#';
}

/** Same rule for image sources (no mailto/tel/anchors). */
export function safeImageSrc(src) {
  if (typeof src !== 'string') return '';
  const s = src.trim();
  return /^https?:\/\//i.test(s) || (s.startsWith('/') && !s.startsWith('//')) || s.startsWith('data:image/') ? s : '';
}
