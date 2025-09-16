// src/hooks/useFilePreviews.js
import { useEffect, useMemo } from 'react';

export function useFilePreviews(files) {
  const urls = useMemo(() => files.map(f => ({ file: f, url: URL.createObjectURL(f) })), [files]);
  useEffect(() => {
    return () => urls.forEach(({ url }) => URL.revokeObjectURL(url));
  }, [urls]);
  return urls; // [{file, url}]
}
