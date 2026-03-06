// src/hooks/useEntriesByModel.ts
import { useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';
import type { ModelSchema } from '@/types/Model';

export interface EntryWithModel {
  id: string;
  title: string;
  status?: string;
  updatedAt?: string;
  modelId: string;
  modelLabel: string;
}

export interface EntriesByModelGroup {
  modelId: string;
  modelLabel: string;
  entries: EntryWithModel[];
}

function getEntryTitle(entry: { id: string; data?: Record<string, any> }): string {
  const d = entry.data ?? {};
  return (d.title ?? d.label ?? d.name ?? entry.id) as string;
}

export function useEntriesByModel(projectId: string) {
  const [data, setData] = useState<EntriesByModelGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const modelsRes = await api.get<{ models: ModelSchema[] }>(
          `/projects/${projectId}/models`
        );
        const models = modelsRes.data.models ?? [];

        const groups: EntriesByModelGroup[] = [];

        for (const model of models) {
          try {
            const entriesRes = await api.get<{
              entries: Array<{
                id: string;
                data?: Record<string, any>;
                status?: string;
                meta?: { audit?: { updatedAt?: string } };
              }>;
            }>(`/projects/${projectId}/models/${model.id}/entries`);
            const rawEntries = entriesRes.data.entries ?? [];
            groups.push({
              modelId: model.id,
              modelLabel: model.label ?? model.id,
              entries: rawEntries.map((e) => ({
                id: e.id,
                title: getEntryTitle(e),
                status: e.status,
                updatedAt: e.meta?.audit?.updatedAt,
                modelId: model.id,
                modelLabel: model.label ?? model.id,
              })),
            });
          } catch {
            // Skip models that fail to load entries
          }
        }

        setData(groups);
      } catch (err: unknown) {
        setData([]);
        setError(err && typeof err === 'object' && 'message' in err
          ? String((err as Error).message)
          : 'Failed to load entries');
      } finally {
        setLoading(false);
      }
    })();
  }, [projectId]);

  return { data, loading, error };
}
