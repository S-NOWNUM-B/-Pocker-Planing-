import { type ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  // TODO: Check if user is authenticated
  // If not — redirect to /login
  // If yes — render children (dashboard, profile, etc.)
  return <>{children}</>;
}
