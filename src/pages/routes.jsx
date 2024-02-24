import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { MainLayout } from '@/components/layouts/main-layout';
import { HomePage } from './home-page';
import { LoginPage } from './login-page';
import { RegisterPage } from './register-page';
import { NotFoundPage } from './not-found-page';
import { ThreadDetailPage } from './thread-detail-page';
import { NewThreadPage } from './new-thread-page';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/:category',
        element: <HomePage />,
      },
      {
        path: '/new-thread',
        element: <NewThreadPage />,
      },
      {
        path: '/threads/:threadId',
        element: <ThreadDetailPage />,
      },
    ],
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
