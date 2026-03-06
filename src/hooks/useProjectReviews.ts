// src/hooks/useProjectReviews.ts
import { useEffect, useState } from 'react';
import { api } from '@/utils/apiClient';

export interface Review {
  id: string;
  status?: string;
  [key: string]: unknown;
}

export interface UseProjectReviewsOptions {
  status?: 'pending' | 'approved' | 'rejected';
  modelId?: string;
  entryId?: string;
}

export function useProjectReviews(
  projectId: string,
  options: UseProjectReviewsOptions = {}
) {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const params = new URLSearchParams();
    if (options.status) params.set('status', options.status);
    if (options.modelId) params.set('modelId', options.modelId);
    if (options.entryId) params.set('entryId', options.entryId);

    const query = params.toString();
    const url = query ? `/projects/${projectId}/reviews?${query}` : `/projects/${projectId}/reviews`;

    api
      .get<{ reviews: Review[] }>(url)
      .then((res) => {
        setData(res.data.reviews ?? []);
        setError(null);
      })
      .catch((err) => {
        setData([]);
        setError(err?.message ?? 'Failed to load reviews');
      })
      .finally(() => setLoading(false));
  }, [projectId, options.status, options.modelId, options.entryId]);

  return {
    data,
    count: data.length,
    loading,
    error,
  };
}
