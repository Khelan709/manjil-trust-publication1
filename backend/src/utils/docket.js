import { randomBytes } from 'node:crypto';

/** Human-readable reference, e.g. MT-INQ-2025-A3F9C1 */
export const makeDocket = (prefix = 'MT-INQ') =>
  `${prefix}-${new Date().getFullYear()}-${randomBytes(3).toString('hex').toUpperCase()}`;
