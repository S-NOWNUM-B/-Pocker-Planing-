/**
 * Страница входа в аккаунт.
 *
 * Содержит форму с полями email и пароль.
 * После успешного входа:
 *  - Сохраняется JWT-токен в localStorage через SessionManager
 *  - Пользователь перенаправляется на /dashboard
 *  - При ошибке показывается сообщение под формой
 */
import { LoginForm } from '@/features/auth';

export function LoginPage() {
  return <LoginForm />;
}
