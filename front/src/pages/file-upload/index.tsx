import PageHead from '@/components/shared/page-head';
import FileUploadGallery from './components/FileUploadGallery'

export default function FileUploadPage() {
  return (
    <>
      <PageHead title="파일 업로드 | New Tech" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">파일 업로드</h2>
        </div>
        <FileUploadGallery />
      </div>
    </>
  );
}