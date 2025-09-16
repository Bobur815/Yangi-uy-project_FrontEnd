import { Paper, Typography, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Verification from '../components/auth/Verification';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/axios';
import TelegramLoginButton from '../components/auth/TelegramLoginButton';
import { isUzPhoneComplete } from '../utils/phoneFormat';
import UzbekPhoneField from '../components/auth/UzbPhoneField';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const { t } = useTranslation();

  const [mode, setMode] = useState('phone');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [tgOtpToken, setTgOtpToken] = useState('');
  const [error, setError] = useState();
  const phoneRef = useRef(null);
  const nav = useNavigate();

  const checkPhone = useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/auth/check-phone', payload);
      return data;
    },
    onSuccess: (res) => {
      if (res?.exists) setMode('login');
      else sendOtp.mutate({ phone: `+998${phoneDigits}`, type: 'register' });
    },
    onError: (e) => setError(e?.response?.data?.message || 'Error'),
  });

  const sendOtp = useMutation({
    mutationFn: async (payload) => (await api.post('/telegram/send-otp', payload)).data,
    onSuccess: (res) => {
      setTgOtpToken(res.tgOtpToken ?? '');
      setMode('verify');
    },
    onError: (e) => {
      const msg = e?.response?.data?.message || 'Error sending OTP';
      if (msg === 'TELEGRAM_NOT_LINKED') {
        window.open("https://t.me/yangiuy_uz_bot", "_blank");
      } else {
        setError(msg);
      }
    }

  });


  const handleContinue = () => {
    if (!isUzPhoneComplete(phoneDigits)) {
      setError(t('Phone is required') || 'Phone is required');
      phoneRef.current?.focus();
      return;
    }

    setError(undefined);

    checkPhone.mutate({ phone: `+998${phoneDigits}` });
  };

  const complete = isUzPhoneComplete(phoneDigits);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-200">
      <Button variant='outlined' onClick={() => nav('/', { replace: true })}>{t('back')}</Button>
      <Paper className="w-full max-w-md py-8 px-6 space-y-4" sx={{ borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 4, fontSize: 20 }} className="text-gray-800">
          {mode === 'phone' ? t('LOGINorSIGNUP') : mode === 'login' ? t('login') : mode === 'verify' ? t('Verification') : t('register')}
        </Typography>

        {mode === 'phone' && (
          <>
            <UzbekPhoneField
              label={t('phone')}
              valueDigits={phoneDigits}
              onDigitsChange={(d) => {
                setPhoneDigits(d); if (error) setError(undefined);
              }}
              error={!!error}
              helperText={error || ' '}
              inputRef={phoneRef}
              onEnter={() => complete && handleContinue()}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleContinue}
              disabled={!complete || checkPhone.isPending || sendOtp.isPending}
            >
              {t('Continue')}
            </Button>
          </>
        )}

        {mode === 'login' && (
          <Login t={t} phone={`+998${phoneDigits}`} onBack={() => setMode('phone')} onSuccessNavigate="/" />
        )}

        {mode === 'verify' && (
          <Verification t={t} phone={`+998${phoneDigits}`} tgOtpToken={tgOtpToken} onVerified={() => setMode('register')} onBack={() => setMode('phone')} />
        )}

        {mode === 'register' && (
          <Register t={t} phone={`+998${phoneDigits}`} onDone={() => (window.location.href = '/users')} onBack={() => setMode('phone')} />
        )}
        {mode === 'phone' && (
          <TelegramLoginButton />
        )}
      </Paper>
    </div>
  );
}
