// src/pages/listings/ListingEditPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { api } from '../lib/axios';
import ListingForm from '../components/listing/ListingForm';

export default function ListingEditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: async () => (await api.get(`/listings/${id}`)).data,
  });

  const updateMut = useMutation({
    mutationFn: async (v) => {
      const fd = new FormData();
      // append fields like in create; for PATCH you can send only changed ones
      Object.entries({
        title: v.title, description: v.description, price: v.price, currency: v.currency,
        deal: v.listingType, rentTerm: v.rentTerm,
        region: v.region, district: v.district, address: v.address, zip: v.zip,
        country: v.country, latitude: v.latitude, longitude: v.longitude,
        bedrooms: v.bedrooms, bathrooms: v.bathrooms, area_m2: v.area_m2, land_area_m2: v.land_area_m2, floor: v.floor,
        categoryId: v.categoryId
      }).forEach(([k, val]) => { if (val !== undefined && val !== '') fd.append(k, String(val)); });

      (v.photos || []).forEach(f => fd.append('photos', f)); // if backend supports adding more photos on edit
      return (await api.patch(`/listings/${id}`, fd)).data;
    },
    onSuccess: () => nav(`/listings/${id}`),
  });

  if (isLoading) return <div className="p-6">{t('loading')}</div>;

  const listing = data?.data ?? data ?? {};
  const initialValues = {
    title: listing.title, description: listing.description, price: listing.price,
    currency: listing.currency, listingType: listing.deal, rentTerm: listing.rentTerm,
    country: listing.country, region: listing.region, district: listing.district, address: listing.address, zip: listing.zip,
    latitude: listing.latitude, longitude: listing.longitude,
    bedrooms: listing.bedrooms, bathrooms: listing.bathrooms, area_m2: listing.area_m2, land_area_m2: listing.land_area_m2, floor: listing.floor,
    categoryId: listing.categoryId,
    photos: [], docs: [],
  };

  return (
    <div className="p-6">
      <Typography variant="h4" fontWeight={700} pb={2}>{t('Edit_Property')}</Typography>
      <ListingForm
        initialValues={initialValues}
        onSubmit={(values) => updateMut.mutate(values)}
        submitting={updateMut.isPending}
      />
    </div>
  );
}
