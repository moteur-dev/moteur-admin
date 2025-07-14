// src/hooks/useModels.ts
import { useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';

interface ModelField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  defaultValue?: any;
}

export interface ModelSchema {
  id: string;
  label: string;
  fields: Record<string, ModelField> | ModelField[];
}

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