import { getToken } from '@/utils/token'

export interface RetryOptions {
  retries?: number        // how many retry attempts (default 3)
  retryDelayMs?: number   // initial delay between retries ms (default 1000)
  exponentialBackoff?: boolean  // double delay after each retry (default false)
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function retryFetch<T>(
  input: RequestInfo,
  init: RequestInit = {},
  options: RetryOptions = {}
): Promise<T> {
  const {
    retries = 3,
    retryDelayMs = 1000,
    exponentialBackoff = false,
  } = options

  let attempt = 0
  let delay = retryDelayMs
  let lastError: any

  // Always inject Authorization header if token exists
  const token = getToken()
  const headers = new Headers(init.headers || {})
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  headers.set('Content-Type', 'application/json')

  const finalInit = {
    ...init,
    headers,
  }

  while (attempt <= retries) {
    try {
      const response = await fetch(input, finalInit)
      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status} ${response.statusText}`)
      }
      const data = (await response.json()) as T
      return data
    } catch (err) {
      lastError = err
      if (attempt === retries) break
      await wait(delay)
      if (exponentialBackoff) delay *= 2
      attempt++
    }
  }

  throw lastError
}
