import { useCallback, useEffect, useState } from 'react';
import { adminApi } from '../adminApi';
import { useAuth } from '../AuthContext';

const INPUT = 'w-full px-3 py-2 rounded border border-outline-variant bg-surface-container-lowest font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary';
const BTN = 'px-4 py-2 rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim disabled:opacity-60';

function Notice({ error, ok }) {
  if (error) return <p role="alert" className="font-body-sm text-body-sm text-error bg-error-container/50 rounded p-2">{error}</p>;
  if (ok) return <p role="status" className="font-body-sm text-body-sm text-on-secondary-fixed bg-secondary-container/60 rounded p-2">{ok}</p>;
  return null;
}

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState({ error: '', ok: '' });
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [pw, setPw] = useState({ current: '', next: '' });
  const [pwMsg, setPwMsg] = useState({ error: '', ok: '' });

  const load = useCallback(() => adminApi.users().then((r) => setUsers(r.users)).catch((e) => setMsg({ error: e.message, ok: '' })), []);
  useEffect(() => { load(); }, [load]);

  const add = async (e) => {
    e.preventDefault(); setMsg({ error: '', ok: '' });
    try { await adminApi.createUser(form); setForm({ email: '', name: '', password: '' }); setMsg({ error: '', ok: 'Admin added.' }); load(); } catch (err) { setMsg({ error: err.message, ok: '' }); }
  };
  const del = async (u) => {
    if (!window.confirm(`Remove admin ${u.email}?`)) return;
    try { await adminApi.deleteUser(u._id); load(); } catch (err) { setMsg({ error: err.message, ok: '' }); }
  };
  const change = async (e) => {
    e.preventDefault(); setPwMsg({ error: '', ok: '' });
    try { await adminApi.changePassword(pw.current, pw.next); setPw({ current: '', next: '' }); setPwMsg({ error: '', ok: 'Password updated.' }); } catch (err) { setPwMsg({ error: err.message, ok: '' }); }
  };

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      <h1 className="font-headline-xl text-headline-xl text-primary font-bold">Admins & Password</h1>

      <section className="bg-surface-container-lowest rounded-lg shadow-sm p-5 flex flex-col gap-3">
        <h2 className="font-headline-sm text-headline-sm text-primary font-semibold">Admin accounts</h2>
        <ul className="divide-y divide-surface-container">
          {users.map((u) => (
            <li key={u._id} className="py-2 flex items-center justify-between gap-3 font-body-sm text-body-sm">
              <span><strong>{u.email}</strong>{u.name ? ` · ${u.name}` : ''}{u.email === user?.email ? ' (you)' : ''}</span>
              {u.email !== user?.email && <button type="button" onClick={() => del(u)} className="px-3 py-1 rounded border border-error text-error hover:bg-error-container/40">Remove</button>}
            </li>
          ))}
        </ul>
        <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end pt-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant">Email<input type="email" required className={INPUT} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label className="font-label-sm text-label-sm text-on-surface-variant">Name<input className={INPUT} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label className="font-label-sm text-label-sm text-on-surface-variant">Password (10+ characters)<input type="password" required minLength={10} autoComplete="new-password" className={INPUT} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <button type="submit" className={`${BTN} sm:col-span-3 sm:justify-self-start`}>Add admin</button>
        </form>
        <Notice {...msg} />
      </section>

      <section className="bg-surface-container-lowest rounded-lg shadow-sm p-5 flex flex-col gap-3">
        <h2 className="font-headline-sm text-headline-sm text-primary font-semibold">Change my password</h2>
        <form onSubmit={change} className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-end">
          <label className="font-label-sm text-label-sm text-on-surface-variant">Current password<input type="password" required autoComplete="current-password" className={INPUT} value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} /></label>
          <label className="font-label-sm text-label-sm text-on-surface-variant">New password (10+ characters)<input type="password" required minLength={10} autoComplete="new-password" className={INPUT} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} /></label>
          <button type="submit" className={`${BTN} sm:justify-self-start`}>Update password</button>
        </form>
        <Notice {...pwMsg} />
      </section>
    </div>
  );
}
