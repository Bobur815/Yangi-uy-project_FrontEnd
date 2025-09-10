import { useRef, useState } from 'react';
import { Button, TextField, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { queryClient } from '../../lib/queryClient';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_RE = /^\d{6}$/;

export default function Register({ t, onGoVerify }) {
  const [form, setForm] = useState({ fullName:'', email:'', password:'', otpCode:'' });
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null); const emailRef = useRef(null); const passRef = useRef(null); const otpRef = useRef(null);

  const sendOtp = useMutation({
    mutationFn: async () => (await api.post('/verification/send', { type: 'register', email: form.email })).data,
  });

  const registerMut = useMutation({
    mutationFn: async (payload) => (await api.post('/auth/register', payload)).data,
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['me'] }); },
  });

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = t('Full name is required');
    if (!form.email.trim()) e.email = t('Email is required'); else if (!EMAIL_RE.test(form.email.trim())) e.email = t('Invalid email');
    if (!form.password.trim()) e.password = t('Password is required'); else if (form.password.trim().length < 6) e.password = t('Password must be at least 6 characters');
    if (!form.otpCode.trim()) e.otpCode = t('OTP code is required'); else if (!OTP_RE.test(form.otpCode.trim())) e.otpCode = t('OTP must be 6 digits');
    setErrors(e);
    const order = [nameRef,emailRef,passRef,otpRef]; const keys=['fullName','email','password','otpCode'];
    for (let i=0;i<keys.length;i++){ if(e[keys[i]]){ order[i].current?.focus(); break; } }
    return Object.keys(e).length === 0;
  };

  return (
    <>
      <TextField label={t('fullName')} fullWidth value={form.fullName}
        onChange={e=>{setForm(f=>({...f,fullName:e.target.value})); if(errors.fullName) setErrors(s=>({...s,fullName:undefined}))}}
        error={!!errors.fullName} helperText={errors.fullName || ' '} inputRef={nameRef}
      />
      <TextField label={t('email')} type="email" fullWidth value={form.email}
        onChange={e=>{setForm(f=>({...f,email:e.target.value})); if(errors.email) setErrors(s=>({...s,email:undefined}))}}
        error={!!errors.email} helperText={errors.email || ' '} inputRef={emailRef}
      />
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={()=>{ if(form.email && EMAIL_RE.test(form.email)) sendOtp.mutate(); }}>
          {t('Send OTP')}
        </Button>
      </Stack>
      <TextField label={t('password')} type="password" fullWidth value={form.password}
        onChange={e=>{setForm(f=>({...f,password:e.target.value})); if(errors.password) setErrors(s=>({...s,password:undefined}))}}
        error={!!errors.password} helperText={errors.password || ' '} inputRef={passRef}
      />
      <TextField label={t('otpCode')} fullWidth value={form.otpCode}
        onChange={e=>{setForm(f=>({...f,otpCode:e.target.value})); if(errors.otpCode) setErrors(s=>({...s,otpCode:undefined}))}}
        error={!!errors.otpCode} helperText={errors.otpCode || ' '} inputRef={otpRef} inputProps={{ maxLength:6 }}
      />
      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="contained" disabled={registerMut.isPending}
          onClick={()=>{ if(validate()) { registerMut.mutate(form); onGoVerify?.(form.email); }}}>
          {t('register')}
        </Button>
      </Stack>
    </>
  );
}
