import { registerAction } from '@/app/router/actions';
import { publicOnlyLoader } from '@/app/router/loaders';
import { RegisterPage } from '@/pages';

export async function clientLoader() {
  return publicOnlyLoader();
}

export async function clientAction({ request }: { request: Request }) {
  return registerAction({ request });
}

export default function RegisterRoute() {
  return <RegisterPage />;
}