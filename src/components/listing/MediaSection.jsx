import {
  Button, IconButton, Stack, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Tooltip
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import { useFilePreviews } from '../../hooks/useFilePreviews';

const MAX_PHOTOS = 12;      // backend: uploadListingPhotos(12), 8MB per file
const MAX_DOCS = 5;         // backend: uploadListingDocs(5), 10MB per file
const MAX_IMG_MB = 8;
const MAX_PDF_MB = 10;

export default function MediaSection({ photos, setPhotos, docs, setDocs, t }) {
  const photoPreviews = useFilePreviews(photos);

  const addPhotos = (e) => {
    const incoming = Array.from(e.target.files || []);
    if (!incoming.length) return;

    const remaining = Math.max(0, MAX_PHOTOS - photos.length);
    const picked = incoming.slice(0, remaining).filter(f => f.type.startsWith('image/'));
    const oversized = picked.filter(f => f.size > MAX_IMG_MB * 1024 * 1024);
    if (oversized.length) {
      alert(t?.('Image_too_large') || `Image exceeds ${MAX_IMG_MB}MB`);
    }
    const valid = picked.filter(f => f.size <= MAX_IMG_MB * 1024 * 1024);

    setPhotos(prev => [...prev, ...valid]);
    e.target.value = ''; // reset input
  };

  const addDocs = (e) => {
    const incoming = Array.from(e.target.files || []);
    if (!incoming.length) return;

    const remaining = Math.max(0, MAX_DOCS - docs.length);
    const picked = incoming.slice(0, remaining).filter(f => f.type === 'application/pdf');
    const oversized = picked.filter(f => f.size > MAX_PDF_MB * 1024 * 1024);
    if (oversized.length) {
      alert(t?.('PDF_too_large') || `PDF exceeds ${MAX_PDF_MB}MB`);
    }
    const valid = picked.filter(f => f.size <= MAX_PDF_MB * 1024 * 1024);

    setDocs(prev => [...prev, ...valid]);
    e.target.value = '';
  };

  const removePhoto = (idx) => setPhotos(prev => prev.filter((_, i) => i !== idx));
  const removeDoc = (idx) => setDocs(prev => prev.filter((_, i) => i !== idx));

  const movePhoto = (from, to) => {
    if (to < 0 || to >= photos.length) return;
    setPhotos(prev => {
      const next = prev.slice();
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  return (
    <Paper className="p-6 space-y-6">
      <Typography variant="h6" fontWeight={600} pb={2}>
        {t?.('Media') || 'Media'}
      </Typography>

      {/* Images */}
      <Typography variant="subtitle1" pb={1}>
        {t?.('Images') || 'Images'}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button component="label" variant="outlined">
          {t?.('UploadPhotos') || 'Upload Photos'}
          <input type="file" hidden accept="image/*" multiple onChange={addPhotos} />
        </Button>
        <span className="text-sm text-slate-600">
          {photos.length ? `${photos.length}/${MAX_PHOTOS}` : t?.('No_photos_selected') || 'No photos selected'}
        </span>
      </Stack>

      {/* Preview grid */}
      {!!photos.length && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photoPreviews.map(({ url }, idx) => (
            <div key={idx} className="relative group rounded-lg overflow-hidden border">
              <img
                src={url}
                alt={`photo-${idx}`}
                className="w-full h-44 object-cover block"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <Tooltip title={t?.('Move_left') || 'Move left'}>
                  <span>
                    <IconButton size="small" onClick={() => movePhoto(idx, idx - 1)} disabled={idx === 0}>
                      <ArrowBackIosNewIcon fontSize="inherit" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={t?.('Move_right') || 'Move right'}>
                  <span>
                    <IconButton size="small" onClick={() => movePhoto(idx, idx + 1)} disabled={idx === photos.length - 1}>
                      <ArrowForwardIosIcon fontSize="inherit" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={t?.('Remove') || 'Remove'}>
                  <IconButton size="small" color="error" onClick={() => removePhoto(idx)}>
                    <DeleteOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </div>

              {/* Optional badge for order */}
              <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Docs */}
      <Typography variant="subtitle1" pb={1}>
        {t?.('Attachments') || 'Attachments'}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button component="label" variant="outlined">
          {t?.('UploadDocs') || 'Upload Docs (PDF)'}
          <input type="file" hidden accept="application/pdf" multiple onChange={addDocs} />
        </Button>
        <span className="text-sm text-slate-600">
          {docs.length ? `${docs.length}/${MAX_DOCS}` : t?.('No_docs_selected') || 'No docs selected'}
        </span>
      </Stack>

      {!!docs.length && (
        <List dense>
          {docs.map((f, idx) => (
            <ListItem
              key={`${f.name}-${idx}`}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeDoc(idx)}>
                  <DeleteOutlineIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                {f.type === 'application/pdf' ? <PictureAsPdfIcon /> : <ImageIcon />}
              </ListItemIcon>
              <ListItemText
                primary={f.name}
                secondary={`${(f.size / 1024 / 1024).toFixed(2)} MB`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
