import { Button, Stack } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AdminPanel() {
  const { t } = useTranslation()
  return (
    <Stack direction="row" spacing={2} className="pt-2">
      <Button variant="contained" component={RouterLink} to="/addcategory" disableElevation size="medium" > {t('addCategory')} </Button>
      <Button variant="contained" component={RouterLink} to="/users" disableElevation size="medium" > {t('Users')} </Button>
    </Stack>)
} export default AdminPanel