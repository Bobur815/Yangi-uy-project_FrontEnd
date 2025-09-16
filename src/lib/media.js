// src/lib/media.ts
export const API_ORIGIN = (() => {
  const raw = import.meta.env.VITE_API_URL || '';
  try {
    return new URL(raw).origin;
  } catch {
    // fallback to current origin in dev if VITE_API_URL is missing
    return window.location.origin;
  }
})();

export function absUrl(url){
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url; // already absolute
  const path = url.startsWith('/') ? url : `/${url}`; // '/uploads/...'
  return `${API_ORIGIN}${path}`;
}
