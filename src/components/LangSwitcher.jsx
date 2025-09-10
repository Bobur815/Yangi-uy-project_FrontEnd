import { MenuItem, TextField } from '@mui/material';
import i18n from '../i18n';

const langs = [
  { code: 'uz', label: 'O‘zbekcha' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export default function LangSwitcher() {
  const current = i18n.language || 'uz';

  return (
    <TextField
      select
      size="small"
      value={current}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem('lang', e.target.value);
      }}
      sx={{
        minWidth: 140,
        // input (closed select) styles
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'var(--paper)',
          color: 'var(--fg)',
          '& fieldset': { borderColor: 'var(--border)' },
          '&:hover fieldset': { borderColor: 'var(--primary)' },
          '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
          '& .MuiSelect-icon': { color: 'var(--fg)' },
        },
      }}
      SelectProps={{
        MenuProps: {
        },
      }}
    >
      {langs.map((l) => (
        <MenuItem
          key={l.code}
          value={l.code}
          sx={{
            '&.Mui-selected': {
              color: '#0F172A',
            }
          }}
        >
          {l.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
