const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (v) => typeof v === 'string' && v.length <= 254 && EMAIL_RE.test(v.trim());
export const isNonEmpty = (v, max = 1000) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;

/**
 * Tiny schema validator: rules = { field: { required, type: 'email'|'string', max, oneOf } }
 * Returns an object of { field: message } (empty when valid).
 */
export function validate(body, rules) {
  const errors = {};
  for (const [field, rule] of Object.entries(rules)) {
    const value = body?.[field];
    const empty = value === undefined || value === null || String(value).trim() === '';
    if (empty) {
      if (rule.required) errors[field] = 'This field is required.';
      continue;
    }
    if (rule.type === 'email' && !isEmail(value)) errors[field] = 'Enter a valid email address.';
    else if (typeof value !== 'string') errors[field] = 'Invalid value.';
    else if (rule.max && value.length > rule.max) errors[field] = `Must be ${rule.max} characters or fewer.`;
    else if (rule.oneOf && !rule.oneOf.includes(value)) errors[field] = 'Unsupported option.';
  }
  return errors;
}
