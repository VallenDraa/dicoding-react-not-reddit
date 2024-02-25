import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { MainLayout } from '@/components/layouts/main-layout';
import { HomePage } from './home-page';
import { LoginPage } from './login-page';
import { RegisterPage } from './register-page';
import { NotFoundPage } from './not-found-page';
import { ThreadDetailPage } from './thread-detail-page';
import { NewThreadPage } from './new-thread-page';
import { ProtectedRoute } from './protected-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'nr/:category',
        index: true,
        element: <HomePage />,
      },
      {
        path: 'threads/new',
        element: (
          <ProtectedRoute>
            <NewThreadPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'threads/:threadId',
        element: <ThreadDetailPage />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
