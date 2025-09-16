import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMe } from '../../hooks/useMe';

export default function Protected() {
  const { t } = useTranslation();
  const { data: me, isLoading } = useMe();
  const loc = useLocation();

  if (isLoading) return <div className="p-6 text-gray-700 dark:text-gray-200">{t('loading')}</div>;
  if (!me) return <Navigate to="/auth" state={{ from: loc }} replace />;

  return <Outlet />;
}
