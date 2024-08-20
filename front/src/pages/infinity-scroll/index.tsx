import PageHead from '@/components/shared/page-head';
import InfiniteScroll from './components/InfiniteScroll';

export default function InfinityScrollPage() {
  return (
    <>
      <PageHead title="무한스크롤 | New Tech" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">무한스크롤</h2>
        </div>
        <InfiniteScroll />
      </div>
    </>
  );
}