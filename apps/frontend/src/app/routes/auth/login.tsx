import { loginAction } from '@/app/router/actions';
import { publicOnlyLoader } from '@/app/router/loaders';
import { LoginPage } from '@/pages';

export async function clientLoader() {
  return publicOnlyLoader();
}

export async function clientAction({ request }: { request: Request }) {
  return loginAction({ request });
}

export default function LoginRoute() {
  return <LoginPage />;
}