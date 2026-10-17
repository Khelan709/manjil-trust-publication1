// Shared test setup: quiet logs, deterministic secret, tiny fake req/res.
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-test-secret-test-secret-123';

export const fakeRes = () => {
  const r = { code: 200, headers: {} };
  r.status = (c) => { r.code = c; return r; };
  r.json = (b) => { r.body = b; return r; };
  r.set = (k, v) => { r.headers[k] = v; return r; };
  return r;
};
export const expectStatus = async (fn, status) => {
  try { await fn(); } catch (e) { if (e.status === status) return e; throw new Error(`expected ${status}, got ${e.status}: ${e.message}`); }
  throw new Error(`expected a ${status} error but nothing was thrown`);
};
