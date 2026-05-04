import { type ReactNode } from 'react';
import { themeTokens } from '@/shared/lib/theme/themeTokens';

const maxWidthClass = {
  md: 'max-w-3xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  full: 'max-w-7xl',
};

interface PageShellProps {
  children: ReactNode;
  maxWidth?: keyof typeof maxWidthClass;
  className?: string;
  contentClassName?: string;
}

export function PageShell({
  children,
  maxWidth = 'full',
  className = '',
  contentClassName = 'min-h-[calc(100vh-8.5rem)]',
}: PageShellProps) {
  return (
    <main className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-20 top-16 h-64 w-64 rounded-full blur-3xl"
          style={{ background: themeTokens.shellGlowPrimary }}
        />
        <div
          className="absolute bottom-10 right-0 h-72 w-72 rounded-full blur-3xl"
          style={{ background: themeTokens.shellGlowAccent }}
        />
      </div>
      <div
        className={`relative z-10 mx-auto w-full ${maxWidthClass[maxWidth]} px-4 py-10 sm:px-6 lg:px-8 ${contentClassName}`}
      >
        {children}
      </div>
    </main>
  );
}
