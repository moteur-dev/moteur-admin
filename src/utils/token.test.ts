import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getToken, setToken, removeToken } from './token';

describe('token', () => {
  beforeEach(() => {
    const store: Record<string, string> = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    });
  });

  describe('getToken', () => {
    it('returns null when no token is set', () => {
      expect(getToken()).toBeNull();
    });

    it('returns the stored token after setToken', () => {
      setToken('abc123');
      expect(getToken()).toBe('abc123');
    });

    it('returns empty string when empty string was stored', () => {
      setToken('');
      expect(getToken()).toBe('');
    });
  });

  describe('setToken', () => {
    it('stores the token so getToken retrieves it', () => {
      setToken('secret');
      expect(getToken()).toBe('secret');
    });

    it('overwrites previous token', () => {
      setToken('first');
      setToken('second');
      expect(getToken()).toBe('second');
    });
  });

  describe('removeToken', () => {
    it('clears the token', () => {
      setToken('abc123');
      removeToken();
      expect(getToken()).toBeNull();
    });

    it('is idempotent when no token was set', () => {
      removeToken();
      expect(getToken()).toBeNull();
    });
  });

});
