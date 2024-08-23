import PageContainer from '@/components/shared/page-container';
import ImageUploadGallery from './components/ImageUploadGallery'


export default function FileUploadPage() {
  return (
    <PageContainer title="파일 업로드">
      <ImageUploadGallery />
    </PageContainer>
  );
}