import './helpers.js';
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';

const { default: app } = await import('../src/app.js');
let server; let base;
before(() => new Promise((r) => { server = app.listen(0, () => { base = `http://127.0.0.1:${server.address().port}`; r(); }); }));
after(() => new Promise((r) => server.close(r)));

const call = (path, opts) => fetch(base + path, opts).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null), headers: r.headers }));

test('health is public and reports DB state', async () => {
  const r = await call('/api/health');
  assert.equal(r.status, 200); assert.equal(r.body.status, 'ok');
});

test('every admin route rejects anonymous requests with 401', async () => {
  const routes = [['GET', '/api/admin/me'], ['PUT', '/api/admin/content/home'], ['DELETE', '/api/admin/content/home'], ['POST', '/api/admin/media'],
    ['GET', '/api/admin/media/507f1f77bcf86cd799439011'], ['GET', '/api/admin/submissions'], ['GET', '/api/admin/submissions/inquiries'],
    ['PATCH', '/api/admin/submissions/inquiries/1'], ['DELETE', '/api/admin/submissions/inquiries/1'], ['GET', '/api/admin/users'], ['POST', '/api/admin/users'], ['DELETE', '/api/admin/users/1'], ['POST', '/api/admin/change-password']];
  for (const [method, path] of routes) {
    const r = await call(path, { method, headers: { 'Content-Type': 'application/json' }, body: ['GET', 'DELETE'].includes(method) ? undefined : '{}' });
    assert.equal(r.status, 401, `${method} ${path} should be 401 but was ${r.status}`);
  }
});

test('a forged token is rejected', async () => {
  const r = await call('/api/admin/me', { headers: { Authorization: 'Bearer eyJhbGciOiJub25lIn0.eyJzdWIiOiIxIn0.' } });
  assert.equal(r.status, 401);
});

test('DB-backed public routes answer 503 (not hang) when the database is down', async () => {
  for (const [m, p] of [['GET', '/api/content'], ['POST', '/api/auth/login'], ['GET', '/media/507f1f77bcf86cd799439011/x.png'], ['POST', '/api/newsletter'], ['POST', '/api/waiver-requests']]) {
    const r = await call(p, { method: m, headers: { 'Content-Type': 'application/json' }, body: m === 'POST' ? '{}' : undefined });
    assert.equal(r.status, 503, `${m} ${p}`);
  }
});

test('security headers and unknown routes', async () => {
  const r = await call('/api/health');
  assert.ok(r.headers.get('content-security-policy')?.includes("default-src 'self'"));
  assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
  assert.equal((await call('/api/nothing')).status, 404);
});
