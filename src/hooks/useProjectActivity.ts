// src/hooks/useProjectActivity.ts
import { useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';

export interface ActivityEvent {
  id: string;
  projectId: string;
  resourceType: string;
  resourceId: string;
  action: string;
  userId: string;
  userName: string;
  timestamp: string;
  fieldPath?: string;
}

export interface ActivityLogPage {
  events: ActivityEvent[];
  nextBefore?: string;
}

export interface UseProjectActivityOptions {
  limit?: number;
  before?: string;
}

export function useProjectActivity(
  projectId: string,
  options: UseProjectActivityOptions = {}
) {
  const { limit = 10 } = options;
  const [data, setData] = useState<ActivityLogPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const params = new URLSearchParams({ limit: String(limit) });
    if (options.before) params.set('before', options.before);

    api
      .get<ActivityLogPage>(`/projects/${projectId}/activity?${params.toString()}`)
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setData(null);
        setError(err?.message ?? 'Failed to load activity');
      })
      .finally(() => setLoading(false));
  }, [projectId, limit, options.before]);

  return {
    data,
    events: data?.events ?? [],
    loading,
    error,
  };
}
