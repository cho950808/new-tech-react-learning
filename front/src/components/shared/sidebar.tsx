'use client';
import DashboardNav from '@/components/shared/dashboard-nav';
import { navItems } from '@/constants/data';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { ChevronsLeft } from 'lucide-react';
import { useState } from 'react';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none px-3 md:block`,
        status && 'duration-500',
        !isMinimized ? 'w-72' : 'w-[80px]',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center px-10 py-3',
          isMinimized ? 'justify-center ' : 'justify-between'
        )}
      >
        {
          !isMinimized && <img src="/logo.png" alt="Logo" className="h-auto w-auto" />
        } 
      </div>
      <div className="space-y-4 py-4">
        <div className="px-2 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-[-15px] flex items-center">
        <ChevronsLeft
          className={cn(
            'cursor-pointer rounded-full border bg-background text-foreground',
            isMinimized && 'rotate-180'
          )}
          onClick={handleToggle}
          style={{
            width: '32px',
            height: '32px',
          }}
        />
      </div>
    </nav>
  );
}