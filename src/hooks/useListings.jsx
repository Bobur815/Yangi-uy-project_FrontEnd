// src/hooks/useListings.js
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { api } from '../lib/axios';


export function useListings(params = {}) {
  const {
    page = 1,
    limit = 12,
    sort,
    deal,
    rentTerm,
    categoryId,
    region,
    district,
    priceMin,
    priceMax,
    q,
    enabled = true,
  } = params;

  return useQuery({
    queryKey: [
      'listings',
      { page, limit, sort, deal, rentTerm, categoryId, region, district, priceMin, priceMax, q },
    ],
    queryFn: async ({ queryKey, signal }) => {
      const [, p] = queryKey;
      const sp = new URLSearchParams();
      sp.set('page', String(p.page));
      sp.set('limit', String(p.limit));
      if (p.sort) sp.set('sort', p.sort);
      if (p.deal) sp.set('deal', p.deal);
      if (p.rentTerm) sp.set('rentTerm', p.rentTerm);
      if (p.categoryId != null && p.categoryId !== '') sp.set('categoryId', String(p.categoryId));
      if (p.region) sp.set('region', p.region);
      if (p.district) sp.set('district', p.district);
      if (p.priceMin != null && p.priceMin !== '') sp.set('priceMin', String(p.priceMin));
      if (p.priceMax != null && p.priceMax !== '') sp.set('priceMax', String(p.priceMax));
      if (p.q) sp.set('q', p.q);

      const url = sp.toString() ? `/listings?${sp.toString()}` : '/listings';
      const res = await api.get(url, { signal });

      // Normalize various backend shapes:
      // 1) { data: [...], total, page, limit }
      // 2) { items: [...], total, page, limit }
      // 3) plain array [...]
      const raw = res.data;
      const items =
        Array.isArray(raw) ? raw :
        Array.isArray(raw?.data) ? raw.data :
        Array.isArray(raw?.items) ? raw.items :
        [];

      const total = raw?.total ?? raw?.meta?.total ?? 0;
      const currentPage = Number(raw?.page ?? p.page ?? 1);
      const pageSize = Number(raw?.limit ?? raw?.meta?.limit ?? p.limit ?? items.length);

      return { items, total, page: currentPage, limit: pageSize };
    },
    // UX niceties
    placeholderData: keepPreviousData,
    keepPreviousData: true,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled,
  });
}
