// src/hooks/useProjects.ts
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    let cancelled = false;
    let attempt = 0;

    const fetchProjects = async () => {
      try {
        const res = await api.get<{projects: ProjectSchema[]}>('/projects');
        if (!cancelled) {
          setData(res.data.projects);
          setLoading(false);
        }
      } catch (err: any) {
        attempt++;
        if (attempt <= retries && !cancelled) {
          const delay = exponentialBackoff
            ? retryDelayMs * Math.pow(2, attempt)
            : retryDelayMs;

          setTimeout(fetchProjects, delay);
        } else if (!cancelled) {
          setError(err.message ?? 'Unknown error');
          setLoading(false);
        }
      }
    };

    fetchProjects();
    return () => {
      cancelled = true;
    };
  }, [retries, retryDelayMs, exponentialBackoff]);

  return { data, loading, error };
}
