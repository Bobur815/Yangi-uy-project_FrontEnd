import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function GoogleLoginButton() {
  const { t } = useTranslation();
  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={() => (window.location.href = `${API_URL}/auth/google`)}
      startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" />}
      className="normal-case rounded-xl py-2"
    >
      {t('continueWithGoogle')}
    </Button>
  );
}
