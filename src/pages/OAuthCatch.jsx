import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function OAuthCatch() {
  const nav = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const access = params.get('access');
    const refresh = params.get('refresh');
    if (access && refresh) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      nav('/users', { replace: true });
    } else {
      nav('/auth', { replace: true });
    }
  }, [nav]);

  return <div className="p-6 text-gray-800 dark:text-gray-100">{t('signingIn')}</div>;
}
