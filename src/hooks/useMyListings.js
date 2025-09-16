import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';

export function useMyListings({ page = 1, limit = 10, status = 'ALL', q = '' }) {
  return useQuery({
    queryKey: ['my-listings', { page, limit, status, q }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(limit));
      if (status && status !== 'ALL') params.set('status', status);
      if (q) params.set('q', q);
      // backend endpoint: /listings/my (see Nest snippet below)
      const { data } = await api.get(`/listings/my?${params.toString()}`);
      // expect { data: items[], total: number }
      return data;
    },
    keepPreviousData: true,
  });
}
