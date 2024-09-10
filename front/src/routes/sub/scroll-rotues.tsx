import { lazy } from 'react';

const InfinityScrollPage = lazy(() => import('@/pages/scroll/infinity-scroll'));
const InteractiveScrollPage = lazy(() => import('@/pages/scroll/interactive-scroll'));

const scrollRoutes = {
  path: 'scroll',
  children: [
    {
      path: 'infinity-scroll',
      element: <InfinityScrollPage />
    },
    {
      path: 'interactive-scroll',
      element: <InteractiveScrollPage />
    },
  ]
};

export default scrollRoutes;