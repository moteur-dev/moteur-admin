import { describe, it, expect } from 'vitest';
import { config } from './config';

describe('config', () => {
  describe('apiBaseUrl', () => {
    it('is defined and a non-empty string', () => {
      expect(config.apiBaseUrl).toBeDefined();
      expect(typeof config.apiBaseUrl).toBe('string');
      expect(config.apiBaseUrl.length).toBeGreaterThan(0);
    });

    it('defaults to localhost:3000 when VITE_API_URL is unset', () => {
      expect(config.apiBaseUrl).toMatch(/^https?:\/\//);
      expect(config.apiBaseUrl).toContain('3000');
    });
  });

  describe('oauthBaseUrl', () => {
    it('is defined and a non-empty string', () => {
      expect(config.oauthBaseUrl).toBeDefined();
      expect(typeof config.oauthBaseUrl).toBe('string');
      expect(config.oauthBaseUrl.length).toBeGreaterThan(0);
    });

    it('is a valid URL', () => {
      expect(() => new URL(config.oauthBaseUrl)).not.toThrow();
    });
  });
});
