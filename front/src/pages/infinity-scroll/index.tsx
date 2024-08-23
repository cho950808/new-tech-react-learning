import PageContainer from '@/components/shared/page-container';
import InfiniteScroll from './components/InfiniteScroll';

export default function InfinityScrollPage() {
  return (
    <PageContainer title="무한스크롤">
      <InfiniteScroll />
    </PageContainer>
  );
}