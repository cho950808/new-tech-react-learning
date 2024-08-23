import PageContainer from '@/components/shared/page-container';
import DefaultCalendar from './components/DefaultCalendar';

export default function CalendarPage() {
  return (
    <PageContainer title="캘린더">
      <DefaultCalendar />
    </PageContainer>
  );
}