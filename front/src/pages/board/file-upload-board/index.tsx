import PageContainer from '@/components/shared/page-container';
import FileUploadBoard from './components/FileUploadBoard';

export default function CalendarBoardPage() {
  return (
    <PageContainer title="파일 업로드 게시판">
      <FileUploadBoard />
    </PageContainer>
  );
}