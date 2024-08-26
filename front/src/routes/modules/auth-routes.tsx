import { lazy } from 'react';

const SignInPage = lazy(() => import('@/pages/auth/signin'));

const authRoutes = [
  {
    path: '/login',
    element: <SignInPage />,
    index: true
  }
];

export default authRoutes;