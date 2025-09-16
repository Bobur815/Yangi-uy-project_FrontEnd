// src/components/listing/ListingCard.jsx
import React, { useMemo, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTranslation } from 'react-i18next';
import { absUrl } from '../../lib/media';

function Amenity({ icon, label, value }) {
  if (value == null) return null;
  return (
    <div className="flex items-center gap-2 text-sm text-slate-700">
      {icon}
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function getFirstPhotoUrl(item) {
  const ph = item?.photos?.[0];
  const raw = typeof ph === 'string' ? ph : (ph?.url || ph?.src);
  if (!raw) return '';
  return absUrl(raw);
}

function formatCurrency(amount, currency) {
  if (amount == null) return '';
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount);
  } catch {
    if (currency === 'UZS') return `${Number(amount).toLocaleString()} so'm`;
    if (currency === 'USD') return `$${Number(amount).toLocaleString()}`;
    return `${Number(amount).toLocaleString()} ${currency || ''}`;
  }
}

function rentSuffix(rentTerm) {
  if (!rentTerm) return '';
  const t = String(rentTerm).toUpperCase();
  if (t.startsWith('DAY')) return '/day';
  if (t.startsWith('WEEK')) return '/week';
  if (t.startsWith('MONTH')) return '/mo';
  if (t.startsWith('YEAR')) return '/yr';
  return `/${t.toLowerCase()}`;
}

export default function ListingCard({
  prop,
  item: itemProp,
  index,
  onFavorite,
  toDetailPath,
  className,
}) {
  const item = itemProp || prop?.item || {};
  const i = index ?? prop?.i;
  const { t } = useTranslation();

  const href = useMemo(() => {
    if (typeof toDetailPath === 'function') return toDetailPath(item);
    if (typeof toDetailPath === 'string' && toDetailPath.trim()) return toDetailPath;
    return item?.id ? `/listings/${item.id}` : '#';
  }, [toDetailPath, item]);

  const cover = useMemo(() => {
    const url = item?.photos?.[0]?.url || item?.src || '';
    return absUrl(url || '');
  }, [item]);

  const [fav, setFav] = useState(!!item?.isFavorite || !!item?.favorite);

  const handleFavClick = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const next = !fav;
      setFav(next);
      try {
        await onFavorite?.(item, next);
      } catch {
        setFav(!next); // revert on error
      }
    },
    [fav, item, onFavorite]
  );

  const photo = useMemo(() => getFirstPhotoUrl(item), [item]);
  const avatarSeller = absUrl(item?.seller?.avatarUrl || '');

  const deal = item?.deal;
  const priceStr = useMemo(() => {
    const base = formatCurrency(item?.price, item?.currency || 'UZS');
    if (deal === 'RENT') return `${base}${rentSuffix(item?.rentTerm)}`;
    return base;
  }, [item?.price, item?.currency, deal, item?.rentTerm]);

  const addressLine = useMemo(() => {
    const parts = [item?.region, item?.district, item?.address].filter(Boolean);
    return parts.join(', ');
  }, [item?.region, item?.district, item?.address]);

  return (
    <div key={item?.id ?? i} className={`px-3 ${className || ''}`}>
      <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
        {/* image */}
        <RouterLink to={href} className="block relative h-56 md:h-64">
          <img
            src={photo || '/placeholder-property.webp'}
            alt={item?.title || 'Property'}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />

          {/* badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {deal === 'SALE' && (
              <span className="px-3 py-1 text-xs font-semibold rounded-md text-white bg-slate-800 shadow">
                {t('forSale') || 'FOR SALE'}
              </span>
            )}
            {deal === 'RENT' && (
              <span className="px-3 py-1 text-xs font-semibold rounded-md text-white bg-indigo-600 shadow">
                {t('forRent') || 'FOR RENT'}
              </span>
            )}
            {item?.status && item?.status !== 'ACTIVE' && (
              <span className="px-3 py-1 text-xs font-semibold rounded-md text-white bg-rose-600 shadow">
                {String(item?.status)}
              </span>
            )}
          </div>

          {/* optional seller avatar circle */}
          <div className="absolute -bottom-6 right-6 w-12 h-12 rounded-full bg-white ring-4 ring-white shadow overflow-hidden">
            <img src={avatarSeller || '/Blank-Avatar-Placeholder.png'} alt="" className="w-full h-full object-cover" />
          </div>
        </RouterLink>

        {/* body */}
        <div className="p-5 pt-6">
          <RouterLink to={href} className="block">
            <h3 className="text-lg font-semibold line-clamp-1">{item?.title}</h3>
            <p className="text-sm text-slate-500 line-clamp-1">{addressLine}</p>
          </RouterLink>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Amenity icon={<BedIcon fontSize="small" />} label={t('bed') || 'Beds'} value={item?.bedrooms} />
            <Amenity icon={<BathtubIcon fontSize="small" />} label={t('bath') || 'Baths'} value={item?.bathrooms} />
            <Amenity icon={<SquareFootIcon fontSize="small" />} label={t('area') || 'Area (m²)'} value={item?.area_m2} />
            {item?.land_area_m2 != null && (
              <Amenity icon={<SquareFootIcon fontSize="small" />} label={t('landArea') || 'Land (m²)'} value={item?.land_area_m2} />
            )}
            {item?.floor != null && (
              <Amenity icon={<OpenInFullIcon fontSize="small" />} label={t('floor') || 'Floor'} value={item?.floor} />
            )}
          </div>

          {/* price bar */}
          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="text-xl font-bold">{priceStr}</div>
              {item?.availableFrom && (
                <div className="text-xs text-slate-400">
                  {t('availableFrom') || 'Available from'}:{' '}
                  {new Date(item.availableFrom).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <RouterLink
                to={href}
                className="grid place-items-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 hover:scale-110 transition"
                aria-label="Open details"
                title={t('openDetails') || 'Open details'}
              >
                <OpenInFullIcon fontSize="small" />
              </RouterLink>

              <button
                type="button"
                onClick={handleFavClick}
                className="grid place-items-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition"
                aria-label="Favorite"
                title={t('favorite') || 'Favorite'}
              >
                {fav ? <FavoriteIcon fontSize="small" className="text-rose-500" /> : <FavoriteBorderIcon fontSize="small" />}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
