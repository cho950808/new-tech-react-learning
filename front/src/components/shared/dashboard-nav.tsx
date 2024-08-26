'use client';
import { ChevronDown, CornerDownRight } from 'lucide-react';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useSidebar } from '@/hooks/use-sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { usePathname } from '@/hooks';
import { Link } from 'react-router-dom';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export default function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);

  // 현재 경로가 서브메뉴 항목 중 하나와 일치하면 해당 서브메뉴를 열어줌
  useEffect(() => {
    const foundIndex = items.findIndex(
      (item) => item.submenu?.some((subItem) => subItem.href === path)
    );
    if (foundIndex !== -1) {
      setOpenSubMenuIndex(foundIndex);
    }
  }, [path, items]);

  if (!items?.length) {
    return null;
  }

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenuIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight'];
          const isActive = path === item.href;
          const isOpen = openSubMenuIndex === index;

          return (
            <div key={index} className="w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Link
                      to={item.disabled ? '/' : item.href}
                      className={cn(
                        'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:text-muted-foreground',
                        isActive
                          ? 'bg-white text-black hover:text-black'
                          : 'transparent',
                        item.disabled && 'cursor-not-allowed opacity-80'
                      )}
                      onClick={(e) => {
                        if (item.submenu) {
                          e.preventDefault(); // 링크 기본 동작 막기
                          handleSubMenuToggle(index);
                        } else {
                          if (setOpen) setOpen(false);
                        }
                      }}
                    >
                      <Icon className={`ml-2.5 size-5`} />
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 truncate">{item.title}</span>
                      ) : (
                        ''
                      )}
                      {item.submenu && (
                        <ChevronDown
                          className={cn(
                            'ml-auto transition-transform duration-300',
                            isOpen ? 'transform rotate-180' : ''
                          )}
                        />
                      )}
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
              
              {/* 서브메뉴 */}
              {item.submenu && (
                <div
                  className={cn(
                    'overflow-hidden transition-max-height duration-300 ease-in-out',
                    isOpen ? 'max-h-screen' : 'max-h-0'
                  )}
                >
                  <div className="ml-3 mt-2 space-y-1">
                    {item.submenu.map((subItem, subIndex) => {
                      return (
                        <Link
                          key={subIndex}
                          to={subItem.disabled ? '/' : subItem.href}
                          className={cn(
                            'flex items-center gap-2 rounded-md py-2 text-sm font-medium hover:text-muted-foreground',
                            path === subItem.href
                              ? 'bg-white text-black hover:text-black'
                              : 'transparent',
                            subItem.disabled && 'cursor-not-allowed opacity-80'
                          )}
                          onClick={() => {
                            if (setOpen) setOpen(false);
                          }}
                        >
                          <CornerDownRight className={`ml-2.5 size-4`} />
                          <span className="truncate">{subItem.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}