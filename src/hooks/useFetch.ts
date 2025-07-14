// src/hooks/useFetch.ts
import { useState, useEffect, useCallback } from 'react'
import { retryFetch } from '@/utils/retryFetch'

export interface UseFetchOptions {
  retries?: number
  retryDelayMs?: number
  exponentialBackoff?: boolean
  skip?: boolean           // <— new
}

export function useFetch<T>(
  url: string,
  options: UseFetchOptions = {}
) {
  const {
    retries = 0,
    retryDelayMs = 0,
    exponentialBackoff = false,
    skip = false,
  } = options

  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(!skip)

  const fetcher = useCallback(async () => {
    if (skip) return
    setLoading(true)
    try {
      const result = await retryFetch<T>(url, undefined, {
        retries,
        retryDelayMs,
        exponentialBackoff,
      })
      setData(result)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [url, retries, retryDelayMs, exponentialBackoff, skip])

  useEffect(() => {
    fetcher()
  }, [fetcher])

  return {
    data,
    error,
    loading,
    refetch: fetcher,
  }
}
