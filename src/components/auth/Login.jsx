import { useRef, useState } from 'react';
import { Button, TextField, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { queryClient } from '../../lib/queryClient';
import { useNavigate } from 'react-router-dom';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ t }) {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const loginMut = useMutation({
    mutationFn: async (payload) => (await api.post('/auth/login', payload)).data,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      nav('/users', { replace: true });
    },
  });

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = t('Email is required') || 'Email is required';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = t('Invalid email') || 'Invalid email';
    if (!form.password.trim()) e.password = t('Password is required') || 'Password is required';
    setErrors(e);
    if (e.email) emailRef.current?.focus(); else if (e.password) passRef.current?.focus();
    return Object.keys(e).length === 0;
  };

  return (
    <>
      <TextField
        label={t('email')}
        type="email"
        fullWidth
        value={form.email}
        onChange={e=>{ setForm(f=>({...f, email:e.target.value})); if(errors.email) setErrors(s=>({...s,email:undefined}))}}
        error={!!errors.email}
        helperText={errors.email || ' '}
        inputRef={emailRef}
      />
      <TextField
        label={t('password')}
        type="password"
        fullWidth
        value={form.password}
        onChange={e=>{ setForm(f=>({...f, password:e.target.value})); if(errors.password) setErrors(s=>({...s,password:undefined}))}}
        error={!!errors.password}
        helperText={errors.password || ' '}
        inputRef={passRef}
        onKeyDown={(e)=>{ if(e.key==='Enter' && validate()) loginMut.mutate(form) }}
      />
      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="contained" disabled={loginMut.isPending} onClick={()=>{ if(validate()) loginMut.mutate(form) }}>
          {t('login')}
        </Button>
      </Stack>
    </>
  );
}
