import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { HomePage } from './home-page';
import { LoginPage } from './login-page';
import { RegisterPage } from './register-page';
import { NotFoundPage } from './not-found-page';
import { ThreadDetailPage } from './thread-detail-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/threads/:threadId',
    element: <ThreadDetailPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
