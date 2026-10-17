import './helpers.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { fakeRes, expectStatus } from './helpers.js';

const { assertSafeContent } = await import('../src/utils/contentSafety.js');
const { signatureMatches, mimeFor } = await import('../src/utils/fileTypes.js');
const { saveUpload } = await import('../src/utils/saveUpload.js');
const AdminUser = (await import('../src/models/AdminUser.js')).default;
const Content = (await import('../src/models/Content.js')).default;
const { login } = await import('../src/controllers/authController.js');
const { saveContent, getContent } = await import('../src/controllers/contentController.js');
const { deleteUser } = await import('../src/controllers/userController.js');
const { updateSubmission } = await import('../src/controllers/submissionsController.js');
const { default: requireAuth } = await import('../src/middleware/requireAuth.js');
const { signToken } = await import('../src/utils/token.js');

const setDbReady = (v) => Object.defineProperty(mongoose.connection, 'readyState', { value: v ? 1 : 0, configurable: true });

test('content safety rejects operator / prototype keys and oversize values', () => {
  assert.doesNotThrow(() => assertSafeContent({ a: { b: ['x', 1, true, null] } }));
  for (const bad of [{ $gt: 1 }, { 'a.b': 1 }, JSON.parse('{"__proto__": {"x":1}}'), { a: 'x'.repeat(20001) }, { a: Array(501).fill(1) }]) {
    assert.throws(() => assertSafeContent(bad), (e) => e.status === 400);
  }
  let deep = {}; let cur = deep; for (let i = 0; i < 20; i++) { cur.n = {}; cur = cur.n; }
  assert.throws(() => assertSafeContent(deep), (e) => e.status === 400);
});

test('file signature must match the extension', () => {
  const pdf = Buffer.from('%PDF-1.7 content here');
  assert.equal(signatureMatches('pdf', pdf), true);
  assert.equal(signatureMatches('png', pdf), false);
  assert.equal(signatureMatches('exe', pdf), false);
  assert.equal(mimeFor('jpg'), 'image/jpeg');
  assert.equal(signatureMatches('zip', Buffer.from('PK\x03\x04 0123456789')), true);
});

test('saveUpload rejects a disguised file before touching the database', async () => {
  await expectStatus(() => saveUpload({ originalname: 'evil.pdf', buffer: Buffer.from('MZ this is an exe ...'), size: 20 }, { kind: 'attachment' }), 400);
});

test('login: success, wrong password, unknown email, bad input', async () => {
  const hash = await bcrypt.hash('correct-horse-battery', 4);
  const user = { _id: 'u1', email: 'a@b.in', name: 'A', passwordHash: hash, save: async () => {} };
  AdminUser.findOne = (q) => ({ select: async () => (q.email === 'a@b.in' ? user : null) });

  const res = fakeRes();
  await login({ body: { email: 'A@B.in', password: 'correct-horse-battery' } }, res);
  assert.ok(res.body.token && res.body.user.email === 'a@b.in');
  assert.equal(res.body.user.passwordHash, undefined);

  await expectStatus(() => login({ body: { email: 'a@b.in', password: 'nope' } }, fakeRes()), 401);
  await expectStatus(() => login({ body: { email: 'x@y.in', password: 'whatever-long' } }, fakeRes()), 401);
  await expectStatus(() => login({ body: { email: 'not-an-email', password: '' } }, fakeRes()), 400);
});

test('requireAuth: missing/invalid token → 401, DB down → 503, valid → sets req.user', async () => {
  const run = (headers) => new Promise((resolve) => { const req = { headers }; requireAuth(req, {}, (err) => resolve({ err, req })); });
  assert.equal((await run({})).err.status, 401);
  assert.equal((await run({ authorization: 'Bearer garbage' })).err.status, 401);
  const token = signToken({ _id: 'u1', email: 'a@b.in' });
  setDbReady(false);
  assert.equal((await run({ authorization: `Bearer ${token}` })).err.status, 503);
  setDbReady(true);
  AdminUser.findById = () => ({ lean: async () => ({ _id: 'u1', email: 'a@b.in', name: 'A' }) });
  const ok = await run({ authorization: `Bearer ${token}` });
  assert.equal(ok.err, undefined); assert.equal(ok.req.user.email, 'a@b.in');
  AdminUser.findById = () => ({ lean: async () => null }); // deleted account
  assert.equal((await run({ authorization: `Bearer ${token}` })).err.status, 401);
  setDbReady(false);
});

test('content: unknown key 404, non-object 400, unsafe 400, success stores updatedBy', async () => {
  const user = { email: 'a@b.in' };
  await expectStatus(() => saveContent({ params: { key: 'nope' }, body: { data: {} }, user }, fakeRes()), 404);
  await expectStatus(() => saveContent({ params: { key: 'home' }, body: { data: [1] }, user }, fakeRes()), 400);
  await expectStatus(() => saveContent({ params: { key: 'home' }, body: { data: { $set: 1 } }, user }, fakeRes()), 400);
  let saved;
  Content.findOneAndUpdate = (f, u) => { saved = { f, u }; return { lean: async () => ({ updatedAt: 'now' }) }; };
  const res = fakeRes();
  await saveContent({ params: { key: 'home' }, body: { data: { hero: { title: 'Hi' } } }, user }, res);
  assert.equal(saved.f.key, 'home'); assert.equal(saved.u.updatedBy, 'a@b.in'); assert.equal(res.body.message, 'Saved.');
  Content.findOne = () => ({ lean: async () => null });
  const r2 = fakeRes(); await getContent({ params: { key: 'home' } }, r2); assert.equal(r2.body.data, null);
});

test('users/submissions guard rails', async () => {
  await expectStatus(() => deleteUser({ params: { id: '507f1f77bcf86cd799439011' }, user: { id: '507f1f77bcf86cd799439011' } }, fakeRes()), 400);
  await expectStatus(() => updateSubmission({ params: { type: 'bogus', id: 'x' }, body: {} }, fakeRes()), 404);
  await expectStatus(() => updateSubmission({ params: { type: 'inquiries', id: '507f1f77bcf86cd799439011' }, body: { status: 'hacked' } }, fakeRes()), 400);
});
