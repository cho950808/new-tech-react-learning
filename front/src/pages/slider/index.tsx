import PageHead from '@/components/shared/page-head';
import SlickSlider from './components/SlickSlider';

export default function DashboardPage() {
  return (
    <>
      <PageHead title="슬라이더 | New Tech" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">슬라이더</h2>
        </div>
        <SlickSlider />
      </div>
    </>
  );
}