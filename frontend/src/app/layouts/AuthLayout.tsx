import { type ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      {/* TODO: Auth layout — centered card, background, logo */}
      {children}
    </div>
  );
}
