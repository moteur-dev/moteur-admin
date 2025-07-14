// src/hooks/usePages.ts
import { useFetch } from '@/hooks/useFetch'

/**
 * Represents a page or template in the project.
 */
export interface PageItem {
  id: string
  title: string
  isTemplate?: boolean
}

// DEV-mode mock pages
const MOCK_PAGES: PageItem[] = [
  { id: 'home',     title: 'Home Page' },
  { id: 'blog',     title: 'Blog Listing' },
  { id: 'contact',  title: 'Contact Us' },
  { id: 'tpl-hero', title: 'Hero Template', isTemplate: true },
  { id: 'tpl-card', title: 'Card Template', isTemplate: true },
]

export interface UsePagesOptions {
  retries?: number
  retryDelayMs?: number
  exponentialBackoff?: boolean
}

export function usePages(
  projectId: string,
  options: UsePagesOptions = {}
) {
  const {
    retries = 2,
    retryDelayMs = 1000,
    exponentialBackoff = true,
  } = options

  // Always call the hook to satisfy the Rules of Hooks,
  // but skip the network call in DEV so it won't error out
  const fetchResult = useFetch<PageItem[]>(
    `/api/moteur/projects/${encodeURIComponent(projectId)}/pages`,
    { retries, retryDelayMs, exponentialBackoff, skip: import.meta.env.DEV }
  )

  if (import.meta.env.DEV) {
    return {
      data: MOCK_PAGES,
      loading: false,
      error: null as string | null,
      refetch: () => {},
    }
  }

  return fetchResult
}
