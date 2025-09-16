// src/pages/listings/ListingDetails.jsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { Box, CircularProgress, Typography, Grid, Button } from '@mui/material';
import { absUrl } from '../lib/media';

export default function ListingDetails() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const { data } = await api.get(`/listings/${id}`);
      return data;
    }
  });

  if (isLoading) return <Box className="flex justify-center p-6"><CircularProgress /></Box>;
  if (isError) return <Box className="text-center text-red-500 p-6">Failed to load listing</Box>;

  const item = data?.data ?? data ?? {};
  const photos = item.photos || [];

  return (
    <Box className="container mx-auto px-4 py-6">
      {/* Photos */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <img
            src={absUrl(photos[0]?.url) || '/placeholder-property.webp'}
            alt={item.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={1}>
            {photos.slice(1, 4).map((ph) => (
              <Grid item xs={6} key={ph.id || ph.url}>
                <img
                  src={absUrl(ph.url)}
                  alt="gallery"
                  className="w-full h-[190px] object-cover rounded-lg"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Title + Price */}
      <Box className="mt-6">
        <Typography variant="h4" fontWeight={700}>{item.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {item.address}, {item.district}, {item.region}
        </Typography>
        <Typography variant="h5" fontWeight={600} mt={2}>
          {item.price} {item.currency}
          {item.deal === 'RENT' && item.rentTerm ? ` / ${item.rentTerm.toLowerCase()}` : ''}
        </Typography>
      </Box>

      {/* Description */}
      <Box className="mt-6">
        <Typography variant="h6" fontWeight={600}>Description</Typography>
        <Typography color="text.secondary" mt={1}>
          {item.description || 'No description provided.'}
        </Typography>
      </Box>

      {/* Documents */}
      {item.docs?.length > 0 && (
        <Box className="mt-6">
          <Typography variant="h6" fontWeight={600}>Documents</Typography>
          <ul>
            {item.docs.map((doc, i) => (
              <li key={i}>
                <a href={absUrl(doc.url)} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                  Download {doc.name || `Document ${i + 1}`}
                </a>
              </li>
            ))}
          </ul>
        </Box>
      )}

      {/* Contact Form (dummy for now) */}
      <Box className="mt-8 p-6 border rounded-lg shadow-sm">
        <Typography variant="h6" fontWeight={600} mb={2}>Contact Seller</Typography>
        <Typography>{item.seller?.fullName}</Typography>
        <Typography>{item.seller?.phone}</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>Send Request</Button>
      </Box>
    </Box>
  );
}
