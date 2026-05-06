import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AuthLayout, RootLayout } from '../layouts';
import { authLoader, publicOnlyLoader } from './loaders';
import { loginAction, registerAction } from './actions';
import {
  OnboardingPage,
  CreateRoomPage,
  JoinRoomPage,
  InvitePage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  AboutPage,
  RoomPage,
  NotFoundPage,
} from '../../pages';

function AuthLayoutWrapper() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <OnboardingPage />,
      },
      {
        path: '/create-room',
        element: <CreateRoomPage />,
      },
      {
        path: '/join-room',
        element: <JoinRoomPage />,
      },
      {
        path: '/invite/:token',
        element: <InvitePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/room/:roomId',
        element: <RoomPage />,
      },
      {
        path: '/login',
        loader: publicOnlyLoader,
        element: <AuthLayoutWrapper />,
        children: [
          {
            index: true,
            action: loginAction,
            element: <LoginPage />,
          },
        ],
      },
      {
        path: '/register',
        loader: publicOnlyLoader,
        element: <AuthLayoutWrapper />,
        children: [
          {
            index: true,
            action: registerAction,
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: '/dashboard',
        loader: authLoader,
        element: <DashboardPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
