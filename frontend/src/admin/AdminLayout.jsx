import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { useAuth } from './AuthContext';
import { adminApi } from './adminApi';
import { CONTENT_SECTIONS } from '../data/defaults';
import { SUBMISSION_TYPES } from './pages/Submissions';

const item = ({ isActive }) =>
  `flex items-center justify-between gap-2 px-3 py-2 rounded font-label-md text-label-md transition-colors ${
    isActive ? 'bg-secondary-container text-on-secondary-fixed font-semibold' : 'text-on-primary hover:bg-primary-container'
  }`;

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    document.title = 'Admin | Manjil Publication';
    const meta = document.createElement('meta');
    meta.name = 'robots'; meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    adminApi.counts().then((r) => setCounts(r.counts)).catch(() => {});
    return () => meta.remove();
  }, []);

  const nav = (
    <nav aria-label="Admin" className="flex flex-col gap-1 p-3 overflow-y-auto">
      <NavLink to="/admin" end className={item} onClick={() => setOpen(false)}><span>Dashboard</span></NavLink>
      <p className="px-3 pt-4 pb-1 font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed">Website content</p>
      {CONTENT_SECTIONS.map((s) => (
        <NavLink key={s.key} to={`/admin/content/${s.key}`} className={item} onClick={() => setOpen(false)}><span>{s.label}</span></NavLink>
      ))}
      <p className="px-3 pt-4 pb-1 font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed">Submissions</p>
      {SUBMISSION_TYPES.map((t) => (
        <NavLink key={t.key} to={`/admin/submissions/${t.key}`} className={item} onClick={() => setOpen(false)}>
          <span>{t.label}</span>
          {counts[t.key] > 0 && t.key !== 'subscribers' && <span className="px-2 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold">{counts[t.key]}</span>}
        </NavLink>
      ))}
      <p className="px-3 pt-4 pb-1 font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed">Account</p>
      <NavLink to="/admin/users" className={item} onClick={() => setOpen(false)}><span>Admins & Password</span></NavLink>
    </nav>
  );

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col lg:flex-row">
      <aside className="hidden lg:flex lg:w-72 shrink-0 bg-primary text-on-primary flex-col sticky top-0 h-screen">
        <div className="p-4 border-b border-primary-container">
          <div className="font-headline-sm text-headline-sm font-semibold">Manjil Publication</div>
          <div className="font-label-sm text-label-sm text-on-primary-container">Admin panel</div>
        </div>
        {nav}
      </aside>

      <header className="lg:hidden bg-primary text-on-primary flex items-center justify-between p-3 sticky top-0 z-30">
        <span className="font-headline-sm text-headline-sm font-semibold">Admin panel</span>
        <button type="button" aria-expanded={open} aria-label="Menu" onClick={() => setOpen((o) => !o)} className="w-10 h-10 rounded bg-primary-container flex items-center justify-center"><Icon name={open ? 'close' : 'menu'} /></button>
      </header>
      {open && <div className="lg:hidden bg-primary text-on-primary max-h-[70vh] overflow-y-auto">{nav}</div>}

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="bg-surface-container-lowest border-b border-outline-variant/50 px-6 py-3 flex items-center justify-between gap-4">
          <Link to="/" target="_blank" className="font-label-md text-label-md text-primary hover:text-secondary inline-flex items-center gap-1"><Icon name="open_in_new" size={16} /> View website</Link>
          <div className="flex items-center gap-3 font-label-md text-label-md text-on-surface-variant">
            <span className="hidden sm:inline">{user?.email}</span>
            <button type="button" onClick={logout} className="px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-primary">Sign out</button>
          </div>
        </div>
        <main className="p-4 sm:p-6 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
