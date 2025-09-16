// src/components/home/SearchBar.jsx
import React, { useMemo, useState } from 'react';
import { Box, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import {Grid} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UZ_REGIONS } from '../../utils/uzLocations';



const ROOM_OPTIONS = ['1', '2', '3', '4', '4+'];
const SORT_OPTIONS = [
  { value: 'new', labelKey: 'Newest' },
  { value: 'price_asc', labelKey: 'Price_low_to_high' },
  { value: 'price_desc', labelKey: 'Price_high_to_low' },
];

export default function SearchBar({ value, onChange }) {
  const { t } = useTranslation();
  const [advanced, setAdvanced] = useState(false);

  const q         = value?.q         ?? '';
  const region    = value?.region    ?? '';
  const district  = value?.district  ?? '';
  const rooms     = value?.rooms     ?? '';
  const priceMin  = value?.priceMin  ?? '';
  const priceMax  = value?.priceMax  ?? '';
  const sort      = value?.sort      ?? 'new';
  const deal      = value?.deal      ?? '';      // optional
  const rentTerm  = value?.rentTerm  ?? '';      // optional
  const categoryId= value?.categoryId?? '';

  const districts = useMemo(() => {
    const r = UZ_REGIONS.find(r => r.name === region);
    return r ? r.districts : [];
  }, [region]);

  const apply = () => {
    onChange?.({ q, region, district, rooms, priceMin, priceMax, sort, deal, rentTerm, categoryId });
  };

  const clearAll = () => {
    onChange?.({
      q: '', region: '', district: '', rooms: '',
      priceMin: '', priceMax: '', sort: 'new', deal: '', rentTerm: '', categoryId: '',
    });
  };

  return (
    <Box className="container mx-auto mb-4">
      <Stack direction="row" gap={2} alignItems="center" className="w-full">
        <TextField
          fullWidth
          placeholder={t('placeholder')}
          value={q}
          onChange={(e) => onChange?.({ q: e.target.value })}
          size="small"
        />

        <Stack direction="row" gap={1}>
          <Button
          size='large'
            variant={advanced ? 'contained' : 'outlined'}
            onClick={() => setAdvanced((v) => !v)}
          >
            {t('advanced')}
          </Button>

          <Button
          size='large'
            variant="contained"
            onClick={apply}
          >
            {t('search')}
          </Button>
        </Stack>
      </Stack>

      <Collapse in={advanced} mountOnEnter unmountOnExit>
        <Box className="mt-3 p-4 rounded-xl bg-white shadow-sm">
          <Grid container spacing={2}>
            {/* Region */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>{t('region')}</InputLabel>
                <Select
                  label={t('region')}
                  value={region}
                  onChange={(e) => onChange?.({ region: e.target.value, district: '' })}
                >
                  <MenuItem value="" selected>{t('all')}</MenuItem>
                  {UZ_REGIONS.map((r) => (
                    <MenuItem key={r.name} value={r.name} onChange={(e) => onChange?.({region: e.target.value})}>{r.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* District (depends on region) */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth disabled={!region}>
                <InputLabel>{t('city')}</InputLabel>
                <Select
                  label={t('city')}
                  value={district}
                  onChange={(e) => onChange?.({ district: e.target.value })}
                >
                  <MenuItem value="">{t('all')}</MenuItem>
                  {districts.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Rooms */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>{t('rooms')}</InputLabel>
                <Select
                  label={t('rooms')}
                  value={rooms}
                  onChange={(e) => onChange?.({ rooms: e.target.value })}
                >
                  <MenuItem value="">{t('Any')}</MenuItem>
                  {ROOM_OPTIONS.map((r) => (
                    <MenuItem key={r} value={r}>{r}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price Min / Max */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label={t('minPrice')}
                type="number"
                value={priceMin}
                onChange={(e) => onChange?.({ priceMin: e.target.value })}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label={t('maxPrice')}
                type="number"
                value={priceMax}
                onChange={(e) => onChange?.({ priceMax: e.target.value })}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* Sort */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>{t('sort')}</InputLabel>
                <Select
                  label={t('sort')}
                  value={sort}
                  onChange={(e) => onChange?.({ sort: e.target.value })}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Optional filters (uncomment if needed) */}
            {/* Deal */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>{t('Deal')}</InputLabel>
                <Select
                  label={t('Deal')}
                  value={deal}
                  onChange={(e) => onChange?.({ deal: e.target.value })}
                >
                  <MenuItem value="">{t('Any')}</MenuItem>
                  <MenuItem value="RENT">RENT</MenuItem>
                  <MenuItem value="SALE">SALE</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* rentTerm */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth disabled={deal !== 'RENT'}>
                <InputLabel>{t('RentTerm')}</InputLabel>
                <Select
                  label={t('RentTerm')}
                  value={rentTerm}
                  onChange={(e) => onChange?.({ rentTerm: e.target.value })}
                >
                  <MenuItem value="">{t('Any')}</MenuItem>
                  <MenuItem value="DAILY">{t('DAILY')}</MenuItem>
                  <MenuItem value="MONTHLY">{t('MONTHLY')}</MenuItem>
                  <MenuItem value="LONG_TERM">{t('LONG_TERM')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" gap={1} mt={3}>
            <Button variant="outlined" onClick={clearAll}>
              {t('clear')}
            </Button>
            <Button variant="contained" onClick={apply}>
              {t('apply')}
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}
