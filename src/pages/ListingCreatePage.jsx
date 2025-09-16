// src/pages/listings/ListingCreatePage.jsx
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { api } from '../lib/axios';
import ListingForm from '../components/listing/ListingForm';
import { useTranslation } from 'react-i18next';

export default function ListingCreatePage() {
    const nav = useNavigate();
    const { t } = useTranslation();

    const createMut = useMutation({
        mutationFn: async (v) => {
            const fd = new FormData();

            // --- required/basic fields ---
            fd.append('title', (v.title || '').trim());
            fd.append('description', v.description || '');
            fd.append('price', String(Number(v.price) || 0));
            fd.append('currency', v.currency || 'UZS');

            // deal + rentTerm (your schema uses: deal, rentTerm?)
            // listingType in the UI == deal in DB
            fd.append('deal', v.listingType); // 'RENT' | 'SALE'
            if (v.listingType === 'RENT' && v.rentTerm) {
                fd.append('rentTerm', v.rentTerm); // 'DAILY' | 'MONTHLY' | 'LONG_TERM'
            }

            // --- category ---
            if (v.categoryId != null && v.categoryId !== '') {
                fd.append('categoryId', String(Number(v.categoryId)));
            }

            console.log(v.rooms);
            

            if (v.rooms != null && v.rooms !== '') {
                fd.append('rooms', v.rooms);
            }

            if (v.country) fd.append('country', v.country);
            if (v.region) fd.append('region', v.region);
            if (v.district) fd.append('district', v.district);
            if (v.address) fd.append('address', v.address); // street / house number
            if (v.zip) fd.append('zip', v.zip);

            // optional coordinates (only if you added latitude/longitude to Prisma)
            if (v.latitude) fd.append('latitude', String(v.latitude));
            if (v.longitude) fd.append('longitude', String(v.longitude));

            // --- additional info (optional numeric fields) ---
            if (v.bedrooms !== undefined && v.bedrooms !== '') fd.append('bedrooms', String(Number(v.bedrooms)));
            if (v.bathrooms !== undefined && v.bathrooms !== '') fd.append('bathrooms', String(Number(v.bathrooms)));
            if (v.area_m2 !== undefined && v.area_m2 !== '') fd.append('area_m2', String(Number(v.area_m2)));
            if (v.land_area_m2 !== undefined && v.land_area_m2 !== '') fd.append('land_area_m2', String(Number(v.land_area_m2)));
            if (v.floor !== undefined && v.floor !== '') fd.append('floor', String(Number(v.floor)));

            // --- amenities/features ---
            // If you chose separate boolean columns on Listing (wifi, electricity, gas, heatingSystem, airConditioner):
            if (v.features) {
                const { wifi, electricity, gas, heatingSystem, airConditioner } = v.features;
                if (wifi !== undefined) fd.append('wifi', String(!!wifi));
                if (electricity !== undefined) fd.append('electricity', String(!!electricity));
                if (gas !== undefined) fd.append('gas', String(!!gas));
                if (heatingSystem !== undefined) fd.append('heatingSystem', String(!!heatingSystem));
                if (airConditioner !== undefined) fd.append('airConditioner', String(!!airConditioner));
            }
            // If instead you used a JSON `features Json?` column, send one field:
            // if (v.features) fd.append('features', JSON.stringify(v.features));

            // --- media (order matters; first photo can be treated as cover on backend) ---
            (v.photos || []).forEach((file) => fd.append('photos', file));
            (v.docs || []).forEach((file) => fd.append('docs', file));

            const { data } = await api.post('/listings', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            return data;
        },
        onSuccess: (created) => {
            console.log(created);
            
            const id = created?.data?.id ?? created?.id;
            if (id) nav(`/listings/${id}`, { replace: true });
            else nav('/listings', { replace: true });
        },
        onError: (err) => {
            // Optional: surface server validation errors
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                'Failed to create listing';
            alert(msg);
        },
    });


    return (
        <div className="p-6 w-full flex flex-col items-center justify-center bg-slate-50">
            <Typography variant="h4" fontWeight={700} pb={2}>
                {t('Add_New_Property')}
            </Typography>

            <ListingForm
                onSubmit={(values) => createMut.mutate(values)}
                submitting={createMut.isPending}
            />
        </div>
    );
}
