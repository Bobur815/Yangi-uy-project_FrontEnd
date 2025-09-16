import { useEffect, useMemo, useState } from 'react';
import { useMe } from '../hooks/useMe';
import { api } from '../lib/axios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import {
  Avatar,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { absUrl } from '../lib/media';
import AdminPanel from '../components/admin/AdminPanel';

export default function ProfilePage() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { data: me, isLoading } = useMe();

  // --- local state ---
  const [fullName, setFullName] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (me) {
      setFullName(me.fullName || '');
      setAvatarFile(null);
      setAvatarPreview('');
    }
  }, [me]);

  // preview blob url
  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview('');
      return;
    }
    const url = URL.createObjectURL(avatarFile);
    setAvatarPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  const isSellerOrAgent = me?.role === 'SELLER' || me?.role === 'AGENT';
  const isAdmin = me?.role === 'ADMIN';

  const isDirty = useMemo(() => {
    if (!me) return false;
    const nameChanged = (fullName || '') !== (me.fullName || '');
    const avatarChanged = !!avatarFile;
    return nameChanged || avatarChanged;
  }, [me, fullName, avatarFile]);

  const updateMut = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      if (fullName && fullName !== me.fullName) fd.append('fullName', fullName);
      if (avatarFile) fd.append('avatar', avatarFile);

      const { data } = await api.patch('/users/me', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (updated) => {
      const u = updated?.data ?? updated;
      queryClient.setQueryData(['me'], u);
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 flex items-center gap-3 text-gray-800 dark:text-gray-100">
        <CircularProgress size={20} />
        <span>{t('loading')}</span>
      </div>
    );
  }

  if (!me) {
    nav('/auth', { replace: true });
    return null;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Paper className="p-6 space-y-5 dark:bg-[#111827]">
        <Typography variant="h6" fontWeight={700} className="text-gray-800 dark:text-gray-100">
          {t('profile')}
        </Typography>

        {/* Avatar + Upload */}
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            src={absUrl(me.avatarUrl) || undefined}
            alt={me.fullName}
            sx={{ width: 72, height: 72 }}
          >
            {(!avatarPreview && !me.avatarUrl) ? me.fullName?.[0] : null}
          </Avatar>
          <Button component="label" variant="outlined" disabled={updateMut.isPending}>
            {t('chooseAvatar')}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            />
          </Button>
          {avatarFile && (
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {avatarFile.name}
            </span>
          )}
        </Stack>

        {/* Full name only (email removed for now) */}
        <TextField
          label={t('fullName')}
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={updateMut.isPending}
        />

        {/* Role-based actions */}
        {isSellerOrAgent && (
          <Stack direction="row" spacing={3} className="py-2 mt-4">
            <Button
              variant="contained"
              component={RouterLink}
              to="/listings/new"
              disableElevation
              size="medium"
            >
              {t('addProperty') /* e.g., "Add property" */}
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/my-properties" // or "/listings?owner=me"
              size="medium"
            >
              {t('myProperties') /* e.g., "My properties" */}
            </Button>
          </Stack>
        )}

        {isAdmin && (
          <AdminPanel />
        )}

        {/* Save */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => updateMut.mutate()}
            disabled={!isDirty || updateMut.isPending}
          >
            {updateMut.isPending ? t('saving') : t('saveChanges')}
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
