/**
 * Frontend config from environment.
 * Use VITE_* in .env (e.g. VITE_API_URL=http://localhost:3000).
 * OAuth redirects use apiBaseUrl so the browser goes to the API server for auth.
 */
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  /** Base URL for OAuth redirects (defaults to apiBaseUrl). Set VITE_OAUTH_BASE if different. */
  oauthBaseUrl: import.meta.env.VITE_OAUTH_BASE ?? import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
} as const;
