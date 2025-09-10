import { useRef, useState } from 'react';
import { Button, TextField, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/axios';

const OTP_RE = /^\d{6}$/;

export default function Verification({ t, email, onVerified }) {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const ref = useRef(null);

  const verifyMut = useMutation({
    mutationFn: async () =>
      (await api.post('/verification/verify', { type: 'register', email, otpCode: code })).data,
    onSuccess: () => onVerified?.(),
  });

  const handleVerify = () => {
    if (!OTP_RE.test(code)) {
      setErr(t('OTP must be 6 digits'));
      ref.current?.focus();
      return;
    }
    setErr('');
    verifyMut.mutate();
  };

  return (
    <>
      <TextField
        label={t('otpCode')}
        fullWidth
        value={code}
        onChange={e=>{ setCode(e.target.value); if(err) setErr(''); }}
        error={!!err}
        helperText={err || ' '}
        inputRef={ref}
        inputProps={{ maxLength: 6 }}
      />
      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="contained" onClick={handleVerify}>
          {t('Verify')}
        </Button>
      </Stack>
    </>
  );
}
