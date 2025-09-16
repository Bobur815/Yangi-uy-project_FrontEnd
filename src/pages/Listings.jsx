import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Pagination, Stack, Typography } from '@mui/material';
import {Grid} from '@mui/material'; 
import { useTranslation } from 'react-i18next';

import SearchBar from '../components/home/SearchBar';
import ListingCard from '../components/listing/ListingCard';
import { useListings } from '../hooks/useListings';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/axios';

export default function Listings() {
  const { t } = useTranslation();
  const [sp, setSp] = useSearchParams();

  const page = Number(sp.get('page') || 1);
  const limit = Number(sp.get('limit') || 12);
  const q = sp.get('q') || '';
  const region = sp.get('region') || '';
  const district = sp.get('district') || '';
  const rooms = sp.get('rooms') || '';
  const priceMin = sp.get('priceMin') || '';
  const priceMax = sp.get('priceMax') || '';
  const sort = sp.get('sort') || 'new';
  const deal = sp.get('deal') || '';
  const rentTerm = sp.get('rentTerm') || '';
  const categoryId = sp.get('categoryId') || '';

  const { data, isLoading, isFetching } = useListings({
    page,
    limit,
    q,
    region,
    district,
    priceMin,
    priceMax,
    sort,
    deal,
    rentTerm,
    categoryId,
    rooms,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / limit));

  const setParam = (k, v) => {
    const next = new URLSearchParams(sp);
    if (v === '' || v == null) next.delete(k);
    else next.set(k, String(v));
    if (k !== 'page') next.set('page', '1');
    setSp(next, { replace: true });
  };

  const favMut = useMutation({
    mutationFn: async ({ id, next }) => {
      if (next) return (await api.post(`/favorites/${id}`)).data;
      return (await api.delete(`/favorites/${id}`)).data;
    },
  });

  function handleFavorite(item, next) {
    return favMut.mutateAsync({ id: item.id, next });
  }

  return (
    <Box className="container mx-auto px-3 py-6">
      <SearchBar
        value={{ q, region, district, rooms, priceMin, priceMax, sort, deal, rentTerm, categoryId }}
        onChange={(patch) => {
          const next = new URLSearchParams(sp);
          Object.entries(patch).forEach(([k, v]) => {
            if (v === '' || v == null) next.delete(k);
            else next.set(k, String(v));
          });
          next.set('page', '1');
          setSp(next, { replace: true });
        }}
      />

      <Typography variant="h4" fontWeight={700} className="text-center py-6">
        {t('properties')}
      </Typography>

      {(isLoading || isFetching) && (
        <Stack alignItems="center" my={2}>
          <CircularProgress />
        </Stack>
      )}

      <Grid container spacing={2} sx={{ width: '100%' }}>
        {items.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ListingCard
              item={item}
              onFavorite={handleFavorite}
              toDetailPath={(it) => `/listings/${it.id}`}
            />
          </Grid>
        ))}
      </Grid>

      {!isLoading && items.length === 0 && (
        <Box className="text-center text-slate-500 py-8">{t('No_data')}</Box>
      )}

      {pageCount > 1 && (
        <Stack alignItems="center" mt={4}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_e, p) => setParam('page', p)}
            shape="rounded"
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
}
