// src/hooks/usePages.ts
import { useEffect, useState, useCallback } from 'react';
import { api } from '@/utils/apiClient';

/**
 * Represents a page or template in the project.
 */
export interface PageItem {
  id: string;
  title: string;
  isTemplate?: boolean;
}

// DEV-mode mock pages
const MOCK_PAGES: PageItem[] = [
  { id: 'home', title: 'Home Page' },
  { id: 'blog', title: 'Blog Listing' },
  { id: 'contact', title: 'Contact Us' },
  { id: 'tpl-hero', title: 'Hero Template', isTemplate: true },
  { id: 'tpl-card', title: 'Card Template', isTemplate: true },
];

export interface UsePagesOptions {
  retries?: number;
  retryDelayMs?: number;
  exponentialBackoff?: boolean;
}

export function usePages(projectId: string, options: UsePagesOptions = {}) {
  const {
    retries = 2,
    retryDelayMs = 1000,
    exponentialBackoff = true,
  } = options;

  const [data, setData] = useState<PageItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    let attempt = 0;
    const maxAttempts = retries + 1;

    const doFetch = async (): Promise<void> => {
      try {
        const res = await api.get<PageItem[] | { pages: PageItem[] }>(
          `/api/moteur/projects/${encodeURIComponent(projectId)}/pages`
        );
        const list = Array.isArray(res.data) ? res.data : (res.data as { pages: PageItem[] })?.pages ?? [];
        setData(list);
        setError(null);
        setLoading(false);
      } catch (err: unknown) {
        attempt++;
        const message = err && typeof err === 'object' && 'message' in err ? String((err as Error).message) : 'Failed to load pages';
        if (attempt < maxAttempts) {
          const delay = exponentialBackoff ? retryDelayMs * Math.pow(2, attempt) : retryDelayMs;
          setTimeout(doFetch, delay);
        } else {
          setError(message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    doFetch();
  }, [projectId, retries, retryDelayMs, exponentialBackoff]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      setData(MOCK_PAGES);
      setLoading(false);
      setError(null);
      return;
    }
    fetchPages();
  }, [fetchPages]);

  return {
    data: import.meta.env.DEV ? MOCK_PAGES : data,
    loading: import.meta.env.DEV ? false : loading,
    error: import.meta.env.DEV ? null : error,
    refetch: import.meta.env.DEV ? () => {} : fetchPages,
  };
}
