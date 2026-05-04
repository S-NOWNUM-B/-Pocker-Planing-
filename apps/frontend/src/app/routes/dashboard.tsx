import { authLoader } from '@/app/router/loaders';
import { DashboardPage } from '@/pages';

export async function clientLoader() {
  return authLoader();
}

export default function DashboardRoute() {
  return <DashboardPage />;
}