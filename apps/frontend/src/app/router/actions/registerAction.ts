import { redirect } from 'react-router-dom';
import { register as registerRequest } from '@/entities/user';
import { SessionManager } from '@/shared/lib/session';
import type { ApiError } from '@/shared/api';

export async function registerAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  try {
    const authData = await registerRequest({ email, password, name });
    SessionManager.saveToken(authData.access_token, authData.user);
    return redirect('/dashboard');
  } catch (error) {
    const apiError = error as ApiError;
    return {
      error: apiError.message || 'Произошла ошибка при регистрации',
    };
  }
}
