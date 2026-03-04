// src/hooks/useLayouts.ts
import { useEffect, useState, useCallback } from 'react';
import { api } from '@/utils/apiClient';
import type { LayoutItem } from '@/types/Project';

export type { LayoutItem };

// DEV-mode mock data
const MOCK_LAYOUTS: LayoutItem[] = [
  { id: 'l1', name: 'Landing Page' },
  { id: 'l2', name: 'Article Page' },
  { id: 'l3', name: 'Dashboard Layout' },
];

export interface UseLayoutsOptions {
  retries?: number;
  retryDelayMs?: number;
  exponentialBackoff?: boolean;
}

export function useLayouts(projectId: string, options: UseLayoutsOptions = {}) {
  const {
    retries = 2,
    retryDelayMs = 1000,
    exponentialBackoff = true,
  } = options;

  const [data, setData] = useState<LayoutItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLayouts = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    let attempt = 0;
    const maxAttempts = retries + 1;

    const doFetch = async (): Promise<void> => {
      try {
        const res = await api.get<LayoutItem[] | { layouts: LayoutItem[] }>(
          `/api/moteur/projects/${encodeURIComponent(projectId)}/layouts`
        );
        const list = Array.isArray(res.data) ? res.data : (res.data as { layouts: LayoutItem[] })?.layouts ?? [];
        setData(list);
        setError(null);
        setLoading(false);
      } catch (err: unknown) {
        attempt++;
        const message = err && typeof err === 'object' && 'message' in err ? String((err as Error).message) : 'Failed to load layouts';
        if (attempt < maxAttempts) {
          const delay = exponentialBackoff ? retryDelayMs * Math.pow(2, attempt) : retryDelayMs;
          setTimeout(doFetch, delay);
        } else {
          setError(message);
          setData(null);
          setLoading(false);
        }
      }
    };

    doFetch();
  }, [projectId, retries, retryDelayMs, exponentialBackoff]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      setData(MOCK_LAYOUTS);
      setLoading(false);
      setError(null);
      return;
    }
    fetchLayouts();
  }, [fetchLayouts]);

  return {
    data: import.meta.env.DEV ? MOCK_LAYOUTS : data,
    loading: import.meta.env.DEV ? false : loading,
    error: import.meta.env.DEV ? null : error,
    refetch: import.meta.env.DEV ? () => {} : fetchLayouts,
  };
}
