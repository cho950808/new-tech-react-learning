import { lazy } from 'react';
const SliderPage = lazy(() => import('@/pages/slider'));
const CalendarPage = lazy(() => import('@/pages/calendar'));
const StreamingPage = lazy(() => import('@/pages/streaming'));

const dashboardRoutes = {
  children: [
    {
      path: 'calendar',
      element: <CalendarPage />
    },
    {
      path: 'slider',
      element: <SliderPage />
    },
    {
      path: 'streaming',
      element: <StreamingPage />
    }
  ]
};

export default dashboardRoutes;