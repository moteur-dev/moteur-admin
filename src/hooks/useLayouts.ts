// src/hooks/useLayouts.ts
import { useFetch } from '@/hooks/useFetch'

/**
 * Minimal shape for a layout in the project.
 */
export interface LayoutItem {
  id: string
  name: string
  // additional metadata can be added here
}

// DEV‐mode mock data
const MOCK_LAYOUTS: LayoutItem[] = [
  { id: 'l1', name: 'Landing Page' },
  { id: 'l2', name: 'Article Page' },
  { id: 'l3', name: 'Dashboard Layout' },
]

export interface UseLayoutsOptions {
  retries?: number
  retryDelayMs?: number
  exponentialBackoff?: boolean
}

export function useLayouts(
  projectId: string,
  options: UseLayoutsOptions = {}
) {
  const {
    retries = 2,
    retryDelayMs = 1000,
    exponentialBackoff = true,
  } = options

  // Always call the hook, but skip real fetch in DEV
  const fetchResult = useFetch<LayoutItem[]>(
    `/api/moteur/projects/${encodeURIComponent(projectId)}/layouts`,
    { retries, retryDelayMs, exponentialBackoff, skip: import.meta.env.DEV }
  )

  if (import.meta.env.DEV) {
    return {
      data: MOCK_LAYOUTS,
      loading: false,
      error: null as string | null,
      refetch: () => {},
    }
  }

  return fetchResult
}
