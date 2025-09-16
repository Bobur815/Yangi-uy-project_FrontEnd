// src/pages/listings/MyProperties.jsx
import { useEffect, useMemo, useState } from 'react';
import {
  Paper, Typography, Stack, Button, TextField, IconButton, Chip, MenuItem, Select, InputLabel, FormControl,
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, TablePagination, Tooltip, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useMyListings } from '../../hooks/useMyListings';
import { useDeleteListing } from '../../hooks/useDeleteListing';
import { useToggleListingStatus } from '../../hooks/useToggleListingStatus';
import { useMe } from '../../hooks/useMe';
import { useTranslation } from 'react-i18next';

const STATUS = ['ALL', 'ACTIVE', 'INACTIVE'];

export default function MyProperties() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { data: me, isLoading: meLoading } = useMe();
  const [sp, setSp] = useSearchParams();

  // guard: only SELLER/AGENT
  useEffect(() => {
    if (!meLoading && me && !['SELLER', 'AGENT'].includes(me.role)) {
      nav('/', { replace: true });
    }
  }, [me, meLoading, nav]);

  const page = Number(sp.get('page') || 1);
  const limit = Number(sp.get('limit') || 10);
  const status = sp.get('status') || 'ALL';
  const q = sp.get('q') || '';

  const setParam = (k, v) => {
    const next = new URLSearchParams(sp);
    if (v === '' || v == null) next.delete(k);
    else next.set(k, String(v));
    setSp(next, { replace: true });
  };

  const { data, isLoading, isFetching } = useMyListings({ page, limit, status, q });
  const delMut = useDeleteListing();
  const toggleMut = useToggleListingStatus();

  const items = data?.data || [];
  const total = data?.total || 0;

  const onDelete = async (id) => {
    if (confirm(t('Are_you_Sure?'))) {
      await delMut.mutateAsync(id);
    }
  };

  const onToggle = async (row) => {
    const next = row.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await toggleMut.mutateAsync({ id: row.id, status: next });
  };

  return (
    <div className="p-6">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={700}>{t('My_Properties')}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/listings/new"
        >
          {t('Add_New_Property')}
        </Button>
      </Stack>

      <Paper className="p-4 space-y-3">
        <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
          <TextField
            size="small"
            label={t('Search')}
            value={q}
            onChange={(e) => setParam('q', e.target.value)}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="status-lbl">{t('Status')}</InputLabel>
            <Select
              labelId="status-lbl"
              label={t('Status')}
              value={status}
              onChange={(e) => setParam('status', e.target.value)}
            >
              {STATUS.map(s => <MenuItem key={s} value={s}>{t(s)}</MenuItem>)}
            </Select>
          </FormControl>
          {(isFetching || isLoading) && <CircularProgress size={20} />}
        </Stack>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('Title')}</TableCell>
                <TableCell>{t('Deal')}</TableCell>
                <TableCell>{t('Price')}</TableCell>
                <TableCell>{t('Region')}</TableCell>
                <TableCell>{t('District')}</TableCell>
                <TableCell>{t('Status')}</TableCell>
                <TableCell align="right">{t('Actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.deal}</TableCell>
                  <TableCell>
                    {row.price?.toLocaleString()} {row.currency}
                  </TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.district}</TableCell>
                  <TableCell>
                    <Chip
                      label={t(row.status)}
                      color={row.status === 'ACTIVE' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={t('View')}>
                      <IconButton component={RouterLink} to={`/listings/${row.id}`} size="small">
                        <VisibilityIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Edit')}>
                      <IconButton component={RouterLink} to={`/listings/${row.id}/edit`} size="small">
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={row.status === 'ACTIVE' ? t('Deactivate') : t('Activate')}>
                      <IconButton onClick={() => onToggle(row)} size="small">
                        <PowerSettingsNewIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Delete')}>
                      <IconButton color="error" onClick={() => onDelete(row.id)} size="small">
                        <DeleteOutlineIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {!items.length && !isLoading && (
                <TableRow>
                  <TableCell colSpan={7} align="center" className="text-slate-500 py-8">
                    {t('No_data')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          rowsPerPage={limit}
          onPageChange={(_e, p) => setParam('page', p + 1)}
          onRowsPerPageChange={(e) => { setParam('limit', Number(e.target.value)); setParam('page', 1); }}
          rowsPerPageOptions={[5,10,20,50]}
        />
      </Paper>
    </div>
  );
}
