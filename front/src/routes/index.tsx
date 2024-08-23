import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(() => import('@/components/layout/dashboard-layout'));
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(() => import('@/pages/students/StudentDetailPage'));
const InfinityScrollPage = lazy(() => import('@/pages/infinity-scroll'));
const SliderPage = lazy(() => import('@/pages/slider'));
const CalendarPage = lazy(() => import('@/pages/calendar'));
const ChattingPage = lazy(() => import('@/pages/chatting'));
const StreamingPage = lazy(() => import('@/pages/streaming'));
const GalleryPage = lazy(() => import('@/pages/file-upload/Gallery'));
const BigFileUploadPage = lazy(() => import('@/pages/file-upload/big-file'));

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'student',
          element: <StudentPage />
        },
        {
          path: 'student/details',
          element: <StudentDetailPage />
        },
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
        },
         {
          path: 'file-upload',
          children: [
            {
              path: 'gallery',
              element: <GalleryPage />
            },
            {
              path: 'big-file',
              element: <BigFileUploadPage />
            },
          ]
        },
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
