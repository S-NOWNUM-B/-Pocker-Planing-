import { redirect } from 'react-router-dom';
import { getUser } from '@/entities/user';
import { SessionManager } from '@/shared/lib/session';

export async function authLoader() {
  const token = SessionManager.getToken();

  if (!token) {
    return redirect('/login');
  }

  try {
    const user = await getUser();
    return { user };
  } catch {
    SessionManager.removeToken();
    return redirect('/login');
  }
}
