import { useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';

export interface BlueprintSchema {
  id: string;
  name: string;
  description?: string;
  template?: {
    models?: unknown[];
    layouts?: unknown[];
    structures?: unknown[];
  };
}

export function useBlueprints() {
  const [data, setData] = useState<BlueprintSchema[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .get<{ blueprints: BlueprintSchema[] }>('/projects/blueprints')
      .then((res) => {
        if (!cancelled) {
          setData(res.data.blueprints ?? []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message ?? 'Failed to load blueprints');
          setData([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data: data ?? [], loading, error };
}
