import {
    Checkbox, FormControl, FormControlLabel, FormGroup,
    InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import RoomsType from '../../types/RoomsType';

export default function AmenityFeatures({
    rooms, onRoomsChange,
    bedrooms, onBedroomsChange,
    bathrooms, onBathroomsChange,
    floor, onFloorChange,
    area_m2, onAreaM2Change,
    land_area_m2, onLandAreaM2Change,
    garages, onGaragesChange,
    features, onFeaturesChange,
}) {
    const { t } = useTranslation();

    const handleFeatureChange = (name) => (_e, checked) => {
        onFeaturesChange(prev => ({ ...prev, [name]: checked }));
    };

    return (
        <Paper className="p-6">
            <Typography variant="h6" fontWeight={600} pb={2}>
                {t('Additional_Information')}
            </Typography>

            <Stack
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                }}
            >
                <FormControl fullWidth>
                    <InputLabel id="rooms-label" sx={{ bgcolor: 'white', px: 1 }} required>
                        {t('Rooms')}
                    </InputLabel>
                    <Select
                        labelId="rooms-label"
                        value={rooms ?? ''}                 // ✅ always defined
                        label={t('Rooms')}
                        onChange={(e) => onRoomsChange(e.target.value)}
                    >
                        {RoomsType.map((room) => (
                            <MenuItem key={room} value={room}>{room}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField label={t('bedrooms')} fullWidth value={bedrooms ?? ''} onChange={(e) => onBedroomsChange(e.target.value)} />
                <TextField label={t('bathrooms')} fullWidth value={bathrooms ?? ''} onChange={(e) => onBathroomsChange(e.target.value)} />
                <TextField label={t('floor')} fullWidth value={floor ?? ''} onChange={(e) => onFloorChange(e.target.value)} />
                <TextField label={t('area_m2')} fullWidth value={area_m2 ?? ''} onChange={(e) => onAreaM2Change(e.target.value)} />
                <TextField label={t('land_area_m2')} fullWidth value={land_area_m2 ?? ''} onChange={(e) => onLandAreaM2Change(e.target.value)} />
                <TextField label={t('garages')} fullWidth value={garages ?? ''} onChange={(e) => onGaragesChange(e.target.value)} />
            </Stack>

            <Typography variant="subtitle1" fontWeight={600} mt={3} mb={1}>
                {t('Amenities')}
            </Typography>

            <FormGroup
                sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 1 }}
            >
                <FormControlLabel control={<Checkbox checked={!!features.wifi} onChange={handleFeatureChange('wifi')} />} label={t('wifi')} />
                <FormControlLabel control={<Checkbox checked={!!features.electricity} onChange={handleFeatureChange('electricity')} />} label={t('electricity')} />
                <FormControlLabel control={<Checkbox checked={!!features.gas} onChange={handleFeatureChange('gas')} />} label={t('gas')} />
                <FormControlLabel control={<Checkbox checked={!!features.heatingSystem} onChange={handleFeatureChange('heatingSystem')} />} label={t('heatingSystem')} />
                <FormControlLabel control={<Checkbox checked={!!features.airConditioner} onChange={handleFeatureChange('airConditioner')} />} label={t('airConditioner')} />
                <FormControlLabel control={<Checkbox checked={!!features.water} onChange={handleFeatureChange('water')} />} label={t('water')} />
                <FormControlLabel control={<Checkbox checked={!!features.hotWater} onChange={handleFeatureChange('hotWater')} />} label={t('hotWater')} />
                <FormControlLabel control={<Checkbox checked={!!features.gym} onChange={handleFeatureChange('gym')} />} label={t('gym')} />
                <FormControlLabel control={<Checkbox checked={!!features.refrigerator} onChange={handleFeatureChange('refrigerator')} />} label={t('refrigerator')} />
                <FormControlLabel control={<Checkbox checked={!!features.parking} onChange={handleFeatureChange('parking')} />} label={t('parking')} />
                <FormControlLabel control={<Checkbox checked={!!features.stunning_view} onChange={handleFeatureChange('stunning_view')} />} label={t('stunning_view')} />
            </FormGroup>
        </Paper>
    );
}
