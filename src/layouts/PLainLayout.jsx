import { Outlet } from 'react-router-dom';

export default function PlainLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
