// src/hooks/useCurrentUser.ts
import { useState, useEffect } from 'react';
import { api } from '@/utils/apiClient';
import type { User } from '@/types/User';

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ user: User }>('/auth/me')
      .then(res => setUser(res.data.user)) // 👈 FIXED HERE
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
