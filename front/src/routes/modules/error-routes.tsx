import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = lazy(() => import('@/pages/not-found'));

const errorRoutes = [
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />
  }
];

export default errorRoutes;