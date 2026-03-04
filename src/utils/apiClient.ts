import axios from 'axios';
import { getToken, removeToken } from './token';
import { config } from './config';

export const api = axios.create({
  baseURL: config.apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
