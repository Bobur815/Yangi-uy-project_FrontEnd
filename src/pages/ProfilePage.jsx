import { useState } from 'react';
import { useMe } from '../hooks/useMe';
import { api } from '../lib/axios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { Avatar, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { data: me } = useMe();
  const [fullName, setFullName] = useState(me?.fullName || '');
  const [email, setEmail] = useState(me?.email || '');
  const [avatarFile, setAvatarFile] = useState(null);

  const updateMut = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      if (fullName) fd.append('fullName', fullName);
      if (email) fd.append('email', email);
      if (avatarFile) fd.append('avatar', avatarFile);
      const { data } = await api.patch('/users/me', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      alert('OK');
    },
  });

  if (!me) return <div className="p-6 text-gray-800 dark:text-gray-100">{t('loading')}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Paper className="p-6 space-y-4 dark:bg-[#111827]">
        <Typography variant="h6" fontWeight={700} className="text-gray-800 dark:text-gray-100">{t('profile')}</Typography>

        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar src={me.avatarUrl || undefined} sx={{ width: 72, height: 72 }} />
          <Button component="label" variant="outlined">
            {t('chooseAvatar')}
            <input type="file" hidden accept="image/*" onChange={e=>setAvatarFile(e.target.files?.[0] || null)} />
          </Button>
          {avatarFile && <span className="text-sm text-gray-600 dark:text-gray-300">{avatarFile.name}</span>}
        </Stack>

        <TextField label={t('fullName')} fullWidth value={fullName} onChange={e=>setFullName(e.target.value)} />
        <TextField label={t('email')} fullWidth value={email} onChange={e=>setEmail(e.target.value)} />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={()=>updateMut.mutate()} disabled={updateMut.isPending}>
            {t('saveChanges')}
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
