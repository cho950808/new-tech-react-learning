
import PageContainer from '@/components/shared/page-container';
import VideoPlayer from './components/VideoPlayer'

export default function StreamingPage() {
  return (
    <PageContainer title="스트리밍">
      <VideoPlayer />
    </PageContainer>
  );
}