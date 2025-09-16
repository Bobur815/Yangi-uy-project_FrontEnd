// src/lib/axios.ts
import axios from 'axios';
import { ACCESS, REFRESH } from './tokens';

const baseURL = import.meta.env.VITE_API_URL; // e.g. http://localhost:3000/api

let isRefreshing = false;
let pending= [];

function onRefreshed(newToken) {
  pending.forEach(cb => cb(newToken));
  pending = [];
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

// attach access token
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem(ACCESS);
  if (token) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error;
    const original = config;

    // if not 401 or already retried once, just bail
    if (response?.status !== 401 || original?._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pending.push((newToken) => {
          if (!newToken) return reject(error);
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(original));
        });
      });
    }

    // start refresh
    original._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${baseURL.replace(/\/+$/, '')}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      const newAccess = data?.accessToken;
      localStorage.setItem(ACCESS, newAccess || '');

      onRefreshed(newAccess || null);

      original.headers = original.headers || {};
      if (newAccess) original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    } catch (e) {
      onRefreshed(null);
      localStorage.removeItem(ACCESS);
      localStorage.removeItem(REFRESH);
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
