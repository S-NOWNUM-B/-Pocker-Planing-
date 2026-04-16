import { type ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * Лейаут для страниц авторизации (login, register).
 *
 * Содержит:
 *  - Минимальную высоту экрана для центрирования
 *  - Центрированную колонку с формой
 *  - Мягкий фон
 *
 * Используется как обёртка для LoginPage и RegisterPage в роутере.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-card to-card/50 px-4 py-8">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
