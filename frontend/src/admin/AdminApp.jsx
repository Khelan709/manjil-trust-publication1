import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import AdminLayout from './AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContentEditor from './pages/ContentEditor';
import Submissions from './pages/Submissions';
import Users from './pages/Users';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-on-surface-variant">Loading…</div>;
  return user ? children : <Navigate to="/admin/login" replace />;
}

/** Everything under /admin. Lazy-loaded from App.jsx so visitors never download it. */
export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
          <Route index element={<Dashboard />} />
          <Route path="content/:key" element={<ContentEditor />} />
          <Route path="submissions/:type" element={<Submissions />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
}
