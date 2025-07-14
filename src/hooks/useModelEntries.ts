import { useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';

export interface EntrySummary {
  id: string;
  label?: string;
  createdAt?: string;
}

export function useModelEntries(
  projectId: string | undefined,
  modelId: string | undefined
) {
  const [data, setData] = useState<EntrySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId || !modelId) return;

    setLoading(true);
    api
      .get<{ entries: EntrySummary[] }>(`/projects/${projectId}/models/${modelId}/entries`)
      .then((res) => {
        setData(res.data.entries || []);
        setError(null);
      })
      .catch((err) => {
        setError(err.message ?? 'Failed to load entries');
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [projectId, modelId]);

  return { data, loading, error };
}
