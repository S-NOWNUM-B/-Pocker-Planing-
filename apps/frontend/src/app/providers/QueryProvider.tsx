/**
 * Корневой провайдер приложения.
 *
 * Оборачивает всё приложение в:
 *  - SessionProvider — управление состоянием авторизации и восстановление сессии
 *  - QueryClientProvider (TanStack Query) — для серверного состояния
 *
 * Используется в route root как обёртка над приложением.
 *
 * @param children — дочерние компоненты приложения
 */
import { type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/config';
import { SessionProvider } from './SessionProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
