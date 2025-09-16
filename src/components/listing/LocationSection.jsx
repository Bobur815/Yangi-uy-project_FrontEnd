// src/pages/listings/LocationSection.jsx
import { useMemo, useRef, useState, useEffect } from 'react';
import {
  Paper, Typography, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { GoogleMap, MarkerF, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { UZ_REGIONS } from '../../utils/uzLocations';

const mapContainerStyle = { width: '100%', height: 360 };

export default function LocationSection({
  country, setCountry,
  region, setRegion,
  district, setDistrict,
  address, setAddress,
  zip, setZip,
  latitude, setLatitude,
  longitude, setLongitude,
}) {
  const { t } = useTranslation();

  const { isLoaded } = useJsApiLoader({
    id: 'gmaps-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [center, setCenter] = useState({ lat: 41.311081, lng: 69.240562 }); 
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (latitude && longitude) {
      setCenter({ lat: Number(latitude), lng: Number(longitude) });
    }
  }, [latitude, longitude]);

  const districts = useMemo(() => {
    const r = UZ_REGIONS.find(r => r.name === region);
    return r ? r.districts : [];
  }, [region]);

  const onMapClick = (e) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (lat == null || lng == null) return;
    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
  };

  const handlePlaceChanged = () => {
    const place = searchBoxRef.current?.getPlace?.();
    if (!place || !place.geometry) return;
    const loc = place.geometry.location;
    const lat = loc.lat();
    const lng = loc.lng();
    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
    setCenter({ lat, lng });
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLatitude(lat.toFixed(6));
        setLongitude(lng.toFixed(6));
        setCenter({ lat, lng });
      },
      () => {}
    );
  };

  return (
    <Paper className="p-6 space-y-6">
      <Typography variant="h6" fontWeight={600} pb={2}>
        {t('Location')}
      </Typography>

      <Stack sx={{ display:'grid', gap:2, gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' } }}>
        <TextField
          label={t('Country')}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Uzbekistan"
          fullWidth
          disabled
        />

        {/* Region */}
        <FormControl fullWidth>
          <InputLabel id="region-lbl">{t('Region')}</InputLabel>
          <Select
            labelId="region-lbl"
            value={region}
            label={t('Region')}
            onChange={(e) => { setRegion(e.target.value); setDistrict(''); }}
            required
          >
            {UZ_REGIONS.map(r => (
              <MenuItem key={r.name} value={r.name}>
                {r.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={!region}>
          <InputLabel id="district-lbl">{t('District')}</InputLabel>
          <Select
            labelId="district-lbl"
            value={district}
            label={t('District')}
            onChange={(e) => setDistrict(e.target.value)}
            required
          >
            {districts.map(d => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label={t('Street_and_house')}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t('Street_placeholder')}
          fullWidth
        />

        <TextField
          label={t('ZIP')}
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          fullWidth
        />
      </Stack>

      <Stack gap={1}>
        {isLoaded && (
          <>
            <Autocomplete onLoad={(auto) => (searchBoxRef.current = auto)} onPlaceChanged={handlePlaceChanged}>
              <TextField placeholder={t('Search_on_map')} fullWidth />
            </Autocomplete>

            <div className="flex gap-2">
              <Button variant="outlined" onClick={useMyLocation}>
                {t('Use_my_location')}
              </Button>
            </div>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={latitude && longitude ? 16 : 12}
              onClick={onMapClick}
              options={{ streetViewControl:false, mapTypeControl:false }}
            >
              {(latitude && longitude) && (
                <MarkerF position={{ lat: Number(latitude), lng: Number(longitude) }} />
              )}
            </GoogleMap>
          </>
        )}
        {!isLoaded && <Typography>{t('Loading_map')}...</Typography>}

        <Stack direction="row" gap={2}>
          <TextField
            label="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            fullWidth
          />
          <TextField
            label="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            fullWidth
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
