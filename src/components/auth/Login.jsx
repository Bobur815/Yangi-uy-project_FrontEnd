import { useRef, useState } from 'react';
import { Button, TextField, Stack, InputAdornment, IconButton, Alert } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { queryClient } from '../../lib/queryClient';
import { useNavigate } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ACCESS, REFRESH } from '../../lib/tokens';

export default function Login({ t, phone, onBack, onSuccessNavigate = '/' }) {
  const nav = useNavigate();
  const passRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ password: '' });
  const [errors, setErrors] = useState({ password: '' });
  const [serverErr, setServerErr] = useState('');

  const loginMut = useMutation({
    mutationFn: async () => (await api.post('/auth/login', { phone, password: form.password })).data,
    onSuccess: async (data) => {
      const at = data?.accessToken ?? data?.data?.accessToken;
      const rt = data?.refreshToken ?? data?.data?.refreshToken;

      if (at) localStorage.setItem(ACCESS, at);
      if (rt) localStorage.setItem(REFRESH, rt);
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      nav(onSuccessNavigate, { replace: true });
    },
    onError: (e) => {
      const status = e?.response?.status;
      const msg = e?.response?.data?.message;
      
      if (status === 401) setServerErr(t('Invalid phone or password'));
      else if (status === 423) setServerErr(t('Too many attempts. Try again later.'));
      else if (status === 403) setServerErr(t('Your account is disabled.'));
      else setServerErr(msg || t('Something went wrong'));
    },
  });

  const validate = () => {
    const e = {};
    if (!form.password.trim()) e.password = t('Password is required');
    setErrors(e);
    if (e.password) passRef.current?.focus();
    return Object.keys(e).length === 0;
  };

  return (
    <form onSubmit={(ev) => { ev.preventDefault(); if (validate()) loginMut.mutate(); }}>
      {serverErr && <Alert severity="error" sx={{ mb: 2 }}>{serverErr}</Alert>}

      <TextField
        label={t('password')}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        focused={true}
        autoComplete="current-password"
        value={form.password}
        disabled={loginMut.isPending}
        error={!!errors.password}
        helperText={errors.password || ' '}
        inputRef={passRef}
        onChange={(e) => {
          setForm((f) => ({ ...f, password: e.target.value }));
          if (errors.password) setErrors((s) => ({ ...s, password: '' }));
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((s) => !s)} disabled={loginMut.isPending}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="outlined" onClick={onBack} disabled={loginMut.isPending}>
          {t('Back')}
        </Button>
        <Button fullWidth variant="contained" type="submit" disabled={loginMut.isPending}>
          {t('login')}
        </Button>
      </Stack>
    </form>
  );
}
