// src/hooks/useEntries.ts
import { useFetch } from '@/hooks/useFetch'

/**
 * Mock entries for DEV mode.
 */
const MOCK_ENTRIES = [
  { id: 'e1', title: 'Homepage Content' },
  { id: 'e2', title: 'Blog Post Index' },
  { id: 'e3', title: 'Contact Form' },
]

export interface Entry {
  id: string
  title: string
}

export interface UseEntriesOptions {
  retries?: number
  retryDelayMs?: number
  exponentialBackoff?: boolean
}

export function useEntries(
  projectId: string,
  options: UseEntriesOptions = {}
) {
  const {
    retries = 2,
    retryDelayMs = 1000,
    exponentialBackoff = true,
  } = options

  // Always call useFetch; skip in DEV
  const fetchResult = useFetch<Entry[]>(
    `/api/moteur/projects/${encodeURIComponent(projectId)}/entries`,
    { retries, retryDelayMs, exponentialBackoff, skip: import.meta.env.DEV }
  )

  if (import.meta.env.DEV) {
    return {
      data: MOCK_ENTRIES,
      loading: false,
      error: null as string | null,
      refetch: () => {},
    }
  }

  return fetchResult
}
