// src/hooks/useProjects.ts
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';
import type { ProjectSchema } from '@/types/Project';

export interface UseProjectsOptions {
  retries?: number;
  retryDelayMs?: number;
  exponentialBackoff?: boolean;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const {
    retries = 2,
    retryDelayMs = 1000,
    exponentialBackoff = true,
  } = options;

  const [data, setData] = useState<ProjectSchema[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    let attempt = 0;

    const run = async (): Promise<void> => {
      try {
        const res = await api.get<{ projects: ProjectSchema[] }>('/projects');
        setData(res.data.projects);
        return;
      } catch (err: any) {
        attempt++;
        if (attempt <= retries) {
          const delay = exponentialBackoff
            ? retryDelayMs * Math.pow(2, attempt)
            : retryDelayMs;
          await new Promise(r => setTimeout(r, delay));
          return run();
        }
        setError(err.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    return run();
  }, [retries, retryDelayMs, exponentialBackoff]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { data, loading, error, refetch: fetchProjects };
}
