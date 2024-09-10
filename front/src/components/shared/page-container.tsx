import PageHead from '@/components/shared/page-head';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function PageContainer({ title, children }: PageContainerProps) {
  return (
    <>
      <PageHead title={`${title} | New Tech`} />
      <div className={`flex-1 space-y-4 p-4 pt-6 md:p-8 max-h-screen overflow-y-auto`}>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>
        {children}
      </div>
    </>
  );
}