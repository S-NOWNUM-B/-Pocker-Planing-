import { Outlet } from 'react-router';
import { AuthLayout } from '@/app/layouts';

export default function AuthRouteLayout() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}