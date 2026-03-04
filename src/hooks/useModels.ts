// src/hooks/useModels.ts
import { useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';
import type { ModelSchema } from '@/types/Model';

export function useModels(projectId: string) {
  const [data, setData] = useState<ModelSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    setLoading(true);
    api.get<{ models: ModelSchema[] }>(`/projects/${projectId}/models`)
      .then(res => setData(res.data.models))
      .catch(err => {
        console.error(err);
        setError(err.message ?? 'Failed to load models');
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  return { data, loading, error };
}