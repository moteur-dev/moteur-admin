// src/hooks/useEntries.ts
import { useEffect, useState, useCallback } from 'react';
import { api } from '@/utils/apiClient';
import type { Entry } from '@/types/Project';

const MOCK_ENTRIES: Entry[] = [
  { id: 'e1', title: 'Homepage Content' },
  { id: 'e2', title: 'Blog Post Index' },
  { id: 'e3', title: 'Contact Form' },
];

export type { Entry };

export interface UseEntriesOptions {
  retries?: number;
  retryDelayMs?: number;
  exponentialBackoff?: boolean;
}

export function useEntries(projectId: string, options: UseEntriesOptions = {}) {
  const {
    retries = 2,
    retryDelayMs = 1000,
    exponentialBackoff = true,
  } = options;

  const [data, setData] = useState<Entry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    let attempt = 0;
    const maxAttempts = retries + 1;

    const doFetch = async (): Promise<void> => {
      try {
        const res = await api.get<Entry[] | { entries: Entry[] }>(
          `/api/moteur/projects/${encodeURIComponent(projectId)}/entries`
        );
        const list = Array.isArray(res.data) ? res.data : (res.data as { entries: Entry[] })?.entries ?? [];
        setData(list);
        setError(null);
        setLoading(false);
      } catch (err: unknown) {
        attempt++;
        const message = err && typeof err === 'object' && 'message' in err ? String((err as Error).message) : 'Failed to load entries';
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
      setData(MOCK_ENTRIES as Entry[]);
      setLoading(false);
      setError(null);
      return;
    }
    fetchEntries();
  }, [fetchEntries]);

  return {
    data: import.meta.env.DEV ? (MOCK_ENTRIES as Entry[]) : data,
    loading: import.meta.env.DEV ? false : loading,
    error: import.meta.env.DEV ? null : error,
    refetch: import.meta.env.DEV ? () => {} : fetchEntries,
  };
}
