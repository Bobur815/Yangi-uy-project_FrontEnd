import { Navigate, useLocation } from 'react-router-dom';
import { useMe } from '../../hooks/useMe';

export default function RequireRole({ roles, children }) {
  const { data: me, isLoading } = useMe();
  const loc = useLocation();

  if (isLoading) return null; // or loader
  if (!me) return <Navigate to="/auth" replace state={{ from: loc }} />;
  if (!roles.includes(me.role)) return <Navigate to="/" replace />;

  return children;
}
