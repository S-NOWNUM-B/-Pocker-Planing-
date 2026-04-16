import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import { useSession } from '@/app/providers';
import { Spinner } from '@/shared/ui/Spinner';

interface PublicOnlyGuardProps {
  children: ReactNode;
}

/**
 * Guard для публичных маршрутов, доступных только неавторизованным.
 *
 * Проверяет, что пользователь НЕ авторизован.
 * - Если приложение инициализируется — показывает спиннер загрузки.
 * - Если пользователь авторизован — перенаправляет на /dashboard.
 * - Если не авторизован — рендерит дочерние компоненты (login, register).
 *
 * Используется для предотвращения повторного входа
 * уже авторизованного пользователя.
 */
export function PublicOnlyGuard({ children }: PublicOnlyGuardProps) {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
