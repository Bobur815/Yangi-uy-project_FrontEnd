import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function TelegramLoginButton() {
  const { t } = useTranslation();
  return (
    <>
      <div className="relative flex flex-col items-center text-center my-7 py-3">
        <div className="absolute bottom-2.5 inset-x-0 border text-gray-300" />
        <span className="absolute -top-2 bg-white p-2 text-md text-gray-500">{t('or')}</span>
      </div>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => (window.location.href = `${API_URL}/auth/telegram`)}
        startIcon={
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
            alt="Telegram"
            className="w-5 h-5"
          />
        }
        className="normal-case rounded-xl py-2"
      >
        {t('continueWithTelegram')}
      </Button>
    </>
  );
}
