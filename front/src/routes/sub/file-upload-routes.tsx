import { lazy } from 'react';

const GalleryPage = lazy(() => import('@/pages/file-upload/gallery'));
const BigFileUploadPage = lazy(() => import('@/pages/file-upload/big-file'));

const fileUploadRoutes = {
  path: 'file-upload',
  children: [
    {
      path: 'gallery',
      element: <GalleryPage />
    },
    {
      path: 'big-file',
      element: <BigFileUploadPage />
    }
  ]
};

export default fileUploadRoutes;