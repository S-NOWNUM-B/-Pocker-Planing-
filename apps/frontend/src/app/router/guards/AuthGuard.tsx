import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import { useSession } from '@/app/providers';
import { Spinner } from '@/shared/ui/Spinner';

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Guard для защищённых маршрутов.
 *
 * Проверяет наличие авторизованного пользователя.
 * - Если приложение инициализируется — показывает спиннер загрузки.
 * - Если пользователь авторизован — рендерит дочерние компоненты (dashboard, profile и т.д.).
 * - Если не авторизован — перенаправляет на /login.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
