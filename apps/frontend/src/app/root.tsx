import type { ReactNode } from 'react';
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';
import { AppProviders } from './providers';
import { RootLayout } from './layouts';
import { NotFoundPage } from '@/pages';
import './styles/index.css';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AppProviders>
      <RootLayout />
    </AppProviders>
  );
}

export function ErrorBoundary() {
  return <NotFoundPage />;
}