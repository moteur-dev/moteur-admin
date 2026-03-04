import { describe, it, expect } from 'vitest';
import { api } from './apiClient';
import { config } from './config';

describe('apiClient', () => {
  it('uses config.apiBaseUrl as baseURL', () => {
    expect(api.defaults.baseURL).toBe(config.apiBaseUrl);
  });
});
