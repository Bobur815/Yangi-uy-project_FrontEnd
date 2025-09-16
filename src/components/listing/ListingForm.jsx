import { useState } from 'react';
import {
    Stack, TextField, Button, MenuItem, InputLabel, Select, FormControl,
    Paper,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AmenityFeatures from './Amenities';
import { useCategories } from '../../hooks/useCategories';
import LocationSection from './LocationSection';
import MediaSection from './MediaSection';

const listingTypes = ['RENT', 'SALE'];


const currencies = ['UZS', 'USD'];
const listingRentTerms = ['MONTHLY', 'LONG_TERM', 'DAILY']

export default function ListingForm({ onSubmit, submitting }) {
    const [title, setTitle] = useState('');
    const [listingType, setListingType] = useState('RENT');
    const [currency, setCurrency] = useState('UZS');
    const [rentTerm, setRentTerm] = useState('')
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);
    const [categoryId, setCategoryId] = useState('')
    const [docs, setDocs] = useState([]);
    const { t } = useTranslation()

    const [country, setCountry] = useState('Uzbekistan');
    const [region, setRegion] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [rooms, setRooms] = useState('');
    const [bedrooms, setBedRooms] = useState('');
    const [bathrooms, setBathRooms] = useState('')
    const [floor, setFloor] = useState('')
    const [area_m2, setArea_m2] = useState('')
    const [land_area_m2, setLand_Area_m2] = useState('')
    const [garages, setGarages] = useState('')

    const [features, setFeatures] = useState({
        wifi: false,
        electricity: false,
        gas: false,
        heatingSystem: false,
        airConditioning: false,
        water: false,
        hotWater: false,
        gym: false,
        refrigerator: false,
        parking: false,
        stunning_view: false
    });

    const { data: categories, isLoading, isError } = useCategories();

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography color="error">Failed to load categories</Typography>;


    const handlePhotos = (e) => setPhotos(Array.from(e.target.files || []));
    const handleDocs = (e) => setDocs(Array.from(e.target.files || []));

    const submit = (e) => {
        e.preventDefault();
        onSubmit({
            title,
            listingType,
            price: Number(price) || 0,
            currency,
            description,
            photos,
            docs,
            categoryId: categoryId ? Number(categoryId) : undefined,
            country,
            region,
            district,
            address,
            zip: zip || undefined,
            latitude: latitude ? Number(latitude) : undefined,
            longitude: longitude ? Number(longitude) : undefined,
            rooms,
            bedrooms,
            bathrooms,
            floor,
            area_m2,
            land_area_m2,
            garages,
            features
        });
    };

    return (
        <form onSubmit={submit} className='space-y-6'>
            <Paper className="p-6 space-y-6">
                <Typography variant='h6' fontWeight={600} pb={2}>
                    {t('Contact_Information')}
                </Typography>

                <Stack sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                    <TextField label={t('Property title')} value={title} onChange={e => setTitle(e.target.value)} required />

                    <FormControl>
                        <InputLabel id="type-label" sx={{ bgcolor: 'white', px: 1 }} required>{t('Type')}</InputLabel>
                        <Select labelId={"type-label"} value={listingType} onChange={e => setListingType(e.target.value)}>
                            {listingTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth required={listingType === 'RENT'} disabled={listingType !== 'RENT'}>
                        <InputLabel id="rentTerm-label" sx={{ bgcolor: 'white', px: 1 }}  >{t('RentTerm')}</InputLabel>
                        <Select labelId={"rentTerm-label"} value={rentTerm} onChange={e => setRentTerm(e.target.value)}>
                            {listingRentTerms.map((term) => <MenuItem key={term} value={term}>{t(term)}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="category-label" sx={{ bgcolor: 'white', px: 1 }} required>{t('Category')}</InputLabel>
                        <Select labelId={"category-label"} value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                            {categories.data.map((cat) => <MenuItem key={cat.id} value={String(cat.id)}>{t(cat.name)}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <TextField
                        label={t('Description')}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ gridColumn: '1 / -1' }}
                    />
                </Stack>

            </Paper>

            <AmenityFeatures
                rooms={rooms} onRoomsChange={setRooms}
                bedrooms={bedrooms} onBedroomsChange={setBedRooms}
                bathrooms={bathrooms} onBathroomsChange={setBathRooms}
                floor={floor} onFloorChange={setFloor}
                area_m2={area_m2} onAreaM2Change={setArea_m2}
                land_area_m2={land_area_m2} onLandAreaM2Change={setLand_Area_m2}
                garages={garages} onGaragesChange={setGarages}
                features={features} onFeaturesChange={setFeatures}
            />

            <Paper className='p-6'>
                <Typography variant="h6" fontWeight={600} pb={2}>
                    {t("Price")} {listingType === 'RENT' && rentTerm && ` / ${t(rentTerm)}`}
                </Typography>

                <Stack direction="row" spacing={2}>
                    <TextField label="Price" type="number" fullWidth value={price} onChange={e => setPrice(e.target.value)} required />
                    <FormControl fullWidth>
                        <InputLabel>{t('Currency')}</InputLabel>
                        <Select label="Currency" value={currency} onChange={e => setCurrency(e.target.value)}>
                            {currencies.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>

            </Paper>

            <Paper className='p-6 space-y-6'>
                <LocationSection
                    country={country} setCountry={setCountry}
                    region={region} setRegion={setRegion}
                    district={district} setDistrict={setDistrict}
                    address={address} setAddress={setAddress}
                    zip={zip} setZip={setZip}
                    latitude={latitude} setLatitude={setLatitude}
                    longitude={longitude} setLongitude={setLongitude}
                />

            </Paper>

            <Paper className='p-6 space-y-6'>
                <MediaSection
                    photos={photos}
                    setPhotos={setPhotos}
                    docs={docs}
                    setDocs={setDocs}
                    t={t}
                />

            </Paper>

            <Stack spacing={2} className='flex items-start' >
                <Button variant="contained" type="submit" sx={{ px: 8 }} disabled={submitting}>
                    {submitting ? 'Saving...' : 'Create'}
                </Button>
            </Stack>
        </form>
    );
}
