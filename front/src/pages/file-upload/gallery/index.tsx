import PageContainer from '@/components/shared/page-container';
import FileUploadGallery from './components/FileUploadGallery'


export default function FileUploadPage() {
  return (
    <PageContainer title="파일 업로드">
      <FileUploadGallery />
    </PageContainer>
  );
}