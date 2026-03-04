// src/hooks/useProject.ts
import { useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';
import type { ProjectSchema } from '@/types/Project';

export function useProject(projectId: string) {
  const [data, setData] = useState<ProjectSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    setLoading(true);
    api.get<{ project: ProjectSchema }>(`/projects/${projectId}`)
      .then(res => {
        setData(res.data.project);
        setError(null);
      })
      .catch((err) => {
        setData(null);
        setError(err?.message ?? 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  return { data, loading, error };
}
