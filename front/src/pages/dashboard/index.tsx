import PageContainer from '@/components/shared/page-container';
import RealTimeDashboard from './components/RealTimeDashBoard';
import ActivityLog from './components/ActivityLog';

export default function DashboardPage() {
  return (
    <PageContainer title="차트">
      <RealTimeDashboard />
      <ActivityLog />
    </PageContainer>
  );
}