import { Suspense, lazy } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import authRoutes from './modules/auth-routes';
import errorRoutes from './modules/error-routes';

const DashboardLayout = lazy(() => import('@/components/layout/dashboard-layout'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));

// 자동으로 라우트 가져오기
const mainRoutes = import.meta.glob('./main/*.tsx', { eager: true });
const subRoutes = import.meta.glob('./sub/*.tsx', { eager: true });

// mainRoutes와 subRoutes를 처리하여 children에 추가
const processedMainRoutes = Object.values(mainRoutes).map((module: any) => {
  return module.default;
});

const processedSubRoutes = Object.values(subRoutes).map((module: any) => {
  return module.default;
});

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
        ...processedMainRoutes, // 자동 main 라우트
        ...processedSubRoutes,  // 자동 sub 라우트
      ]
    }
  ];

  const publicRoutes = [
    ...authRoutes,
    ...errorRoutes,
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}