import { useEffect, useRef, useState } from 'react';
import { Button, TextField, Stack, InputAdornment, IconButton, Tooltip } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const RESEND_SECONDS = 180;

const digitsOnly = (s) => s.replace(/\D/g, '').slice(0, 6);

export default function Verification({ t, phone, tgOtpToken, onVerified, onBack }) {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [left, setLeft] = useState(RESEND_SECONDS);
  const ref = useRef(null);
  const timerRef = useRef(null);

  const verifyMut = useMutation({
    mutationFn: async () =>
      (await api.post('/telegram/verify', {
        type: 'register',
        phone,
        otpCode: digitsOnly(code),
        tgOtpToken
      })).data,
    onSuccess: () => onVerified?.(),
    onError: (e) => {
      
      
      setErr(e?.response?.data?.message || t('Invalid OTP'))},
  });

  const resendMut = useMutation({
    mutationFn: async () => (await api.post('/telegram/send-otp', { phone })).data,
    onSuccess: () => startTimer(),
  });

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [phone]);

  const startTimer = () => {
    stopTimer();
    setLeft(RESEND_SECONDS);
    timerRef.current = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleVerify = () => {
    const clean = digitsOnly(code);
    
    if (clean.length !== 6) {
      setErr(t('OTP code must be 6 digits'));
      ref.current?.focus();
      return;
    }
    if (clean !== code) setCode(clean);
    console.log(err);
    setErr('');

    verifyMut.mutate();
  };

  const handleResend = () => {
    if (left > 0 || resendMut.isPending) return;
    resendMut.mutate();
  };

  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }}> {/* << use form submit */}
      <TextField
        label={t('otpCode')}
        fullWidth
        value={code}
        onChange={(e) => { setCode(digitsOnly(e.target.value)); if (err) setErr(''); }} // << sanitize on change
        error={!!err}
        helperText={err || ' '}
        inputRef={ref}
        type="tel"
        autoComplete="one-time-code"
        onKeyUp={(e) => { if (e.key === 'Enter') handleVerify(); }}  // << use onKeyUp (not onKeyDown)
        // If you’re on MUI v5, replace slotProps with inputProps/InputProps
        slotProps={{
          input: {
            inputProps: { maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*' },
            endAdornment: (
              <InputAdornment position="end">
                {left > 0 ? (
                  <span className="text-sm text-gray-500 tabular-nums">{mm}:{ss}</span>
                ) : (
                  <Tooltip title={t('Resend code')}>
                    <span>
                      <IconButton size="small" onClick={handleResend} disabled={resendMut.isPending}>
                        <RestartAltIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="outlined" onClick={onBack}>
          {t('Back')}
        </Button>
        <Button fullWidth variant="contained" type="submit" disabled={verifyMut.isPending}>
          {t('Verify')}
        </Button>
      </Stack>
    </form>
  );
}
