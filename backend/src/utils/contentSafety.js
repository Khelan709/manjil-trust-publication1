import AppError from './AppError.js';

const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * Validates an admin-submitted content document before it is stored: plain JSON only, bounded size/depth,
 * no prototype-pollution or MongoDB-operator keys ("$…", dotted names).
 */
export function assertSafeContent(value, depth = 0) {
  if (depth > 14) throw new AppError(400, 'Content is nested too deeply.');
  if (value === null || typeof value === 'number' || typeof value === 'boolean') return;
  if (typeof value === 'string') {
    if (value.length > 20000) throw new AppError(400, 'A text field is too long (max 20,000 characters).');
    return;
  }
  if (Array.isArray(value)) {
    if (value.length > 500) throw new AppError(400, 'A list has too many items (max 500).');
    value.forEach((v) => assertSafeContent(v, depth + 1));
    return;
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (FORBIDDEN_KEYS.has(k) || k.startsWith('$') || k.includes('.') || k.length > 100) {
        throw new AppError(400, `Invalid field name "${k.slice(0, 40)}".`);
      }
      assertSafeContent(v, depth + 1);
    }
    return;
  }
  throw new AppError(400, 'Unsupported value in content.');
}

export const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
