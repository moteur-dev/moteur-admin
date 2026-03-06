import { useEffect, useState, useCallback } from 'react';
import { api } from '@/utils/apiClient';

export type BlueprintKind = 'project' | 'model' | 'structure';

export interface BlueprintSchema {
  id: string;
  name: string;
  description?: string;
  kind?: BlueprintKind;
  template?: {
    models?: unknown[];
    layouts?: unknown[];
    structures?: unknown[];
    model?: unknown;
    structure?: unknown;
  };
}

export function useBlueprints(kind: BlueprintKind = 'project') {
  const [data, setData] = useState<BlueprintSchema[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlueprints = useCallback(() => {
    setLoading(true);
    setError(null);
    const path = kind === 'project' ? '/blueprints/projects' : kind === 'model' ? '/blueprints/models' : '/blueprints/structures';
    api
      .get<{ blueprints: BlueprintSchema[] }>(path)
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
  }, [kind]);

  useEffect(() => {
    fetchBlueprints();
  }, [fetchBlueprints]);

  return { data: data ?? [], loading, error, refetch: fetchBlueprints };
}

export function useBlueprint(blueprintId: string | null, kind: BlueprintKind = 'project') {
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
    const path = kind === 'project' ? '/blueprints/projects' : kind === 'model' ? '/blueprints/models' : '/blueprints/structures';
    api
      .get<BlueprintSchema>(`${path}/${encodeURIComponent(blueprintId)}`)
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
  }, [blueprintId, kind]);

  return { data, loading, error };
}
