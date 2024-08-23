import PageContainer from '@/components/shared/page-container';
import LargeFileUpload from './components/LargeFileUpload'


export default function FileUploadPage() {
  return (
    <PageContainer title="파일 업로드">
      <LargeFileUpload />
    </PageContainer>
  );
}