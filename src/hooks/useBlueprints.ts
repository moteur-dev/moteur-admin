import { useEffect, useState, useCallback } from 'react';
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

  const fetchBlueprints = useCallback(() => {
    setLoading(true);
    setError(null);
    api
      .get<{ blueprints: BlueprintSchema[] }>('/blueprints')
      .then((res) => {
        setData(res.data.blueprints ?? []);
      })
      .catch((err) => {
        setError(err.message ?? 'Failed to load blueprints');
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchBlueprints();
  }, [fetchBlueprints]);

  return { data: data ?? [], loading, error, refetch: fetchBlueprints };
}

export function useBlueprint(blueprintId: string | null) {
  const [data, setData] = useState<BlueprintSchema | null>(null);
  const [loading, setLoading] = useState(!!blueprintId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blueprintId) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .get<BlueprintSchema>(`/blueprints/${encodeURIComponent(blueprintId)}`)
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message ?? 'Failed to load blueprint');
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [blueprintId]);

  return { data, loading, error };
}
