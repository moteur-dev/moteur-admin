import { useEffect, useState } from 'react';
import { getToken, setToken, removeToken } from '@/utils/token';
import { api } from '@/utils/apiClient';
import type { User } from '@/types/User';
import { AuthContext } from '@/providers/AuthContext';


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const existingToken = getToken();
    if (!existingToken) {
      setLoading(false);
      return;
    }

    api.get<{ user: User }>('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => {
        removeToken();
        setTokenState(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (newToken: string, optionalUser?: User) => {
    setToken(newToken);
    setTokenState(newToken);

    if (optionalUser) {
      setUser(optionalUser);
      return;
    }

    api.get<{ user: User }>('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => {
        removeToken();
        setTokenState(null);
        setUser(null);
      });
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
