import { lazy } from 'react';

const GeneralBoardPage = lazy(() => import('@/pages/board/general-board'));
const FileUploadBoardPage = lazy(() => import('@/pages/board/file-upload-board'));
const CalendarBoardPage = lazy(() => import('@/pages/board/calendar-board'));

const boardRoutes = {
  path: 'board',
  children: [
    {
      path: 'general-board',
      element: <GeneralBoardPage />
    },
    {
      path: 'file-upload-board',
      element: <FileUploadBoardPage />
    },
    {
      path: 'calendar-board',
      element: <CalendarBoardPage />
    }
  ]
};

export default boardRoutes;