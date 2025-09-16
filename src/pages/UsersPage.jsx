import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { useMemo, useState } from 'react';
import { Button, MenuItem, Paper, Stack, TextField, Typography, Pagination, FormControl, InputLabel, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { absUrl } from '../lib/media';

export default function UsersPage() {
  const { t } = useTranslation();

  const [roleTab, setRoleTab] = useState('ALL');
  const [search, setSearch] = useState('');
  const [hasAvatar, setHasAvatar] = useState('any');
  const [isDisabled, setIsDisabled] = useState('any');
  const [page, setPage] = useState(1);
  const limit = 10;

  const endpoint = useMemo(() => {
    if (roleTab === 'SELLER') return '/users/sellers';
    if (roleTab === 'AGENT') return '/users/agents';
    return '/users';
  }, [roleTab]);

  const { data, isLoading } = useQuery({
    queryKey: ['users', endpoint, search, hasAvatar, isDisabled, page],
    queryFn: async () => {
      const params = { offset: (page - 1) * limit, limit };
      if (search.trim()) params.search = search.trim();
      if (hasAvatar !== 'any') params.hasAvatar = hasAvatar;
      if (isDisabled !== 'any') params.isDisabled = isDisabled;
      const res = await api.get(endpoint, { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  return (
    <div className="p-6 space-y-4">
      <Typography variant="h5" fontWeight={700} className="text-gray-800">
        {t('users')}
      </Typography>

      <Paper className="p-4 space-y-3 dark:bg-[#111827]">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <Stack direction="row" spacing={1}>
            <Button variant={roleTab === 'ALL' ? 'contained' : 'outlined'} onClick={() => setRoleTab('ALL')}>
              {t('all')}
            </Button>
            <Button variant={roleTab === 'SELLER' ? 'contained' : 'outlined'} onClick={() => setRoleTab('SELLER')}>
              {t('sellers')}
            </Button>
            <Button variant={roleTab === 'AGENT' ? 'contained' : 'outlined'} onClick={() => setRoleTab('AGENT')}>
              {t('agents')}
            </Button>
          </Stack>

          <TextField
            label={t('searchPlaceholder')}
            size="small"
            value={search}
            onChange={e => setSearch(e.target.value)}
            fullWidth
          />

          <FormControl fullWidth sx={{ maxWidth: 200 }}>
            <InputLabel id='avatar-label' sx={{ bgcolor: 'white', px: 1 }}>{t('hasAvatar')}</InputLabel>
            <Select labelId='avatar-label' label={t('hasAvatar')} size="small" value={hasAvatar} onChange={e => setHasAvatar(e.target.value)}>
              <MenuItem value="any">{t('any')}</MenuItem>
              <MenuItem value="true">{t('yes')}</MenuItem>
              <MenuItem value="false">{t('no')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth  sx={{ maxWidth: 200 }}>
            <InputLabel id='disabled-label' sx={{ bgcolor: 'white', px: 1 }}>{t('isDisabled')}</InputLabel>
            <Select labelId='disabled-label' label={t('isDisabled')} size="small" value={isDisabled} onChange={e => setIsDisabled(e.target.value)}>
              <MenuItem value="any">{t('any')}</MenuItem>
              <MenuItem value="true">{t('yes')}</MenuItem>
              <MenuItem value="false">{t('no')}</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Paper className="p-3 dark:bg-[#111827]">
        {isLoading ? (
          <div className="p-6 text-gray-700 ">{t('loading')}</div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data?.data?.map(u => (
              <div key={u.id} className="flex items-center gap-3 border rounded-lg p-3 dark:border-gray-700">
                <img
                  src={u.avatarUrl ? absUrl(u.avatarUrl) : 'https://placehold.co/64x64?text=U'}
                  className="w-16 h-16 rounded-full object-cover border dark:border-gray-700"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 ">{u.fullName}</div>
                  <div className="text-sm text-gray-500 ">{u.phone}</div>
                  <div className="text-xs uppercase mt-1 text-gray-600 ">{u.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Paper>

      {!!data && (
        <div className="flex justify-center">
          <Pagination
            page={page}
            onChange={(_, p) => setPage(p)}
            count={Math.ceil((data.meta?.total || 0) / limit) || 1}
          />
        </div>
      )}
      <div className="h-8" />
    </div>
  );
}
