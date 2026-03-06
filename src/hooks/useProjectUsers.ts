// src/hooks/useProjectUsers.ts
import { useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';

export interface ProjectUser {
  id: string;
  name?: string;
  avatarUrl?: string;
  roles?: string[];
}

export function useProjectUsers(projectId: string) {
  const [data, setData] = useState<ProjectUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      setData([]);
      return;
    }

    setLoading(true);
    api
      .get<{ users: Array<{ id: string; name?: string; email?: string; avatar?: string; roles?: string[] }> }>(
        `/projects/${projectId}/users`
      )
      .then((res) => {
        const users = (res.data.users ?? []).map((u) => ({
          id: u.id,
          name: u.name ?? u.email ?? u.id,
          avatarUrl: u.avatar,
          roles: u.roles,
        }));
        setData(users);
        setError(null);
      })
      .catch((err) => {
        setData([]);
        setError(err?.message ?? 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  return { data, loading, error };
}
