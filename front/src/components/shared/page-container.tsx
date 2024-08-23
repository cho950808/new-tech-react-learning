import PageHead from '@/components/shared/page-head';

export default function PageContainer ({ title, children }) {
  return (
    <>
    <PageHead title={`${title} | New Tech`} />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>
        {children}
      </div>
    </>
  );
}