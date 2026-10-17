import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useImages } from '../../content/ContentContext';

export default function Login() {
  const { user, login } = useAuth();
  const images = useImages();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    try { await login(email, password); navigate('/admin', { replace: true }); } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  const input = 'w-full px-3 py-2.5 rounded border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary font-body-md text-body-md';
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-surface-container-lowest rounded-xl shadow-2xl p-8 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <img src={images.logo.src} alt="" className="h-20 w-20 object-contain" />
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Admin sign in</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Manjil Publication website management</p>
        </div>
        <label className="flex flex-col gap-1 font-label-md text-label-md text-primary">Email
          <input type="email" required autoComplete="username" className={input} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 font-label-md text-label-md text-primary">Password
          <input type="password" required autoComplete="current-password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p role="alert" className="font-body-sm text-body-sm text-error bg-error-container/50 rounded p-2">{error}</p>}
        <button type="submit" disabled={busy} className="py-2.5 rounded bg-secondary-container text-on-secondary-fixed font-label-lg text-label-lg font-bold hover:bg-secondary-fixed-dim disabled:opacity-60">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <a href="/" className="text-center font-label-sm text-label-sm text-on-surface-variant hover:text-primary">← Back to website</a>
      </form>
    </div>
  );
}
