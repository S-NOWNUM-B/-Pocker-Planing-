import { type ReactNode } from 'react';

interface PublicOnlyGuardProps {
  children: ReactNode;
}

export function PublicOnlyGuard({ children }: PublicOnlyGuardProps) {
  // TODO: Check if user is already authenticated
  // If yes — redirect to /dashboard
  // If not — render children (login, register)
  return <>{children}</>;
}
