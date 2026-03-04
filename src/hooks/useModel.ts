import { useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';
import type { ModelSchema } from '@/types/Model';

export function useModel(projectId: string | undefined, modelId: string | undefined) {
  const [data, setData] = useState<ModelSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId || !modelId) return;

    setLoading(true);
    api.get<{ model: ModelSchema }>(`/projects/${projectId}/models/${modelId}`)
      .then(res => {
        setData(res.data.model);
        setError(null);
      })
      .catch(err => {
        setError(err.message ?? 'Failed to load model');
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [projectId, modelId]);

  return { data, loading, error };
}
