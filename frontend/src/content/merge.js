const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/**
 * Deep-merge admin overrides over the built-in defaults.
 * Objects merge key by key; arrays and primitives from the override replace the default wholesale
 * (so an admin can reorder, add or remove list items).
 */
export function deepMerge(base, over) {
  if (over === undefined || over === null) return base;
  if (isPlainObject(base) && isPlainObject(over)) {
    const out = { ...base };
    for (const key of Object.keys(over)) out[key] = deepMerge(base[key], over[key]);
    return out;
  }
  return over;
}
