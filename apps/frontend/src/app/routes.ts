import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('./routes/home.tsx'),
  route('about', './routes/about.tsx'),
  route('create-room', './routes/create-room.tsx'),
  route('join-room', './routes/join-room.tsx'),
  route('invite/:token', './routes/invite.tsx'),
  route('room/:roomId', './routes/room.tsx'),
  layout('./routes/auth/layout.tsx', [
    route('login', './routes/auth/login.tsx'),
    route('register', './routes/auth/register.tsx'),
  ]),
  route('dashboard', './routes/dashboard.tsx'),
  route('*', './routes/not-found.tsx'),
] satisfies RouteConfig;