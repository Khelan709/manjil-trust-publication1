import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { adminApi, clearToken, getToken, setToken } from './adminApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(getToken()));

  const logout = useCallback(() => { clearToken(); setUser(null); }, []);

  useEffect(() => {
    if (!getToken()) return undefined;
    adminApi.me().then((r) => setUser(r.user)).catch(() => clearToken()).finally(() => setLoading(false));
    return undefined;
  }, []);

  useEffect(() => {
    window.addEventListener('admin-unauthorized', logout);
    return () => window.removeEventListener('admin-unauthorized', logout);
  }, [logout]);

  const login = async (email, password) => {
    const { token, user: u } = await adminApi.login(email, password);
    setToken(token);
    setUser(u);
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
