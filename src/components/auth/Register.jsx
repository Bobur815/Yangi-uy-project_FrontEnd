import { useRef, useState } from 'react';
import { Button, TextField, Stack, InputAdornment, IconButton, MenuItem } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { queryClient } from '../../lib/queryClient';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Register({ t, phone, onDone, onBack }) {
  const [form, setForm] = useState({ fullName: '', password: '', avatar: '', role: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const nameRef = useRef(null); const passRef = useRef(null);

  const ROLE_OPTIONS = ['USER', 'SELLER', 'AGENT'];

  const registerMut = useMutation({
    mutationFn: async () => (await api.post('/auth/register', { ...form, phone })).data,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      onDone?.();
    },
  });

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = t('Full name is required');
    if (!form.password.trim()) e.password = t('Password is required'); else if (form.password.trim().length < 6) e.password = t('Password must be at least 6 characters');
    setErrors(e);
    if (e.fullName) nameRef.current?.focus(); else if (e.password) passRef.current?.focus();
    return Object.keys(e).length === 0;
  };

  return (
    <>
      <TextField
        label={t('phone')}
        fullWidth
        value={phone}
        disabled
        helperText=" "
      />
      <TextField
        label={t('fullName')}
        fullWidth
        value={form.fullName}
        onChange={e => { setForm(f => ({ ...f, fullName: e.target.value })); if (errors.fullName) setErrors(s => ({ ...s, fullName: undefined })) }}
        error={!!errors.fullName}
        helperText={errors.fullName || ' '}
        inputRef={nameRef}
      />
      <TextField
        label={t('password')}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        value={form.password}
        onChange={e => { setForm(f => ({ ...f, password: e.target.value })); if (errors.password) setErrors(s => ({ ...s, password: undefined })) }}
        error={!!errors.password}
        helperText={errors.password || ' '}
        inputRef={passRef}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(s => !s)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label={t('role')}
        select                              
        fullWidth
        value={form.role ?? 'USER'}
        onChange={(e) => {
          const raw = String(e.target.value || '');
          const role = raw.toUpperCase();
          const safe = ROLE_OPTIONS.includes(role) ? role : 'USER';
          setForm(f => ({ ...f, role: safe }));
          if (errors.role) setErrors(s => ({ ...s, role: undefined }));
        }}
        error={!!errors.role}
        helperText={errors.role || ' '}
        SelectProps={{ displayEmpty: true }}
      >
        {ROLE_OPTIONS.map(r => (
          <MenuItem key={r} value={r}>
            {t(`roles.${r.toLowerCase()}`)}
          </MenuItem>
        ))}
        <MenuItem value="ADMIN" disabled>
          {t('roles.admin')} ({t('notAllowed')})
        </MenuItem>
      </TextField>

      {/* Optional: avatar upload field can go here */}
      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="outlined" onClick={onBack}>{t('Back')}</Button>
        <Button fullWidth variant="contained" disabled={registerMut.isPending} onClick={() => { if (validate()) registerMut.mutate(); }}>
          {t('register')}
        </Button>
      </Stack>
    </>
  );
}
