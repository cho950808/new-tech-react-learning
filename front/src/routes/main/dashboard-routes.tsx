import { lazy } from 'react';

const InfinityScrollPage = lazy(() => import('@/pages/infinity-scroll'));
const SliderPage = lazy(() => import('@/pages/slider'));
const CalendarPage = lazy(() => import('@/pages/calendar'));
const ChattingPage = lazy(() => import('@/pages/chatting'));
const StreamingPage = lazy(() => import('@/pages/streaming'));

const dashboardRoutes = {
  children: [
    {
      path: 'infinity-scroll',
      element: <InfinityScrollPage />
    },
    {
      path: 'calendar',
      element: <CalendarPage />
    },
    {
      path: 'slider',
      element: <SliderPage />
    },
    {
      path: 'chatting',
      element: <ChattingPage />
    },
    {
      path: 'streaming',
      element: <StreamingPage />
    }
  ]
};

export default dashboardRoutes;