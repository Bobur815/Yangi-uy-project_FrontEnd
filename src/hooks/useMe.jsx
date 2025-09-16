import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { ACCESS } from '../lib/tokens';

export function useMe() {
  const hasToken = !!localStorage.getItem(ACCESS);

  return useQuery({
    queryKey: ['me'],
    enabled: hasToken,
    queryFn: async () => {
      try {
        const { data } = await api.get('/users/me');
        return data.data ?? data.user ?? data;
      } catch (e) {
        if (e?.response?.status === 401) return null;
        throw e;
      }
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    retry: (count, err) => {
      const status = err?.response?.status;
      if (status && status < 500) return false;
      return count < 2;
    },
  });
}
