import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Sale {
  name: string;
  email: string;
  amount: number;
  avatarSrc: string;
  avatarFallback: string;
}

const RecentSales = () => {
  const [recentSales] = useState<Sale[]>([
    {
      name: '김민수',
      email: 'minsu.kim@email.com',
      amount: 1999,
      avatarSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
      avatarFallback: 'KM'
    },
    {
      name: '이서준',
      email: 'seojoon.lee@email.com',
      amount: 39,
      avatarSrc: 'https://randomuser.me/api/portraits/men/2.jpg',
      avatarFallback: 'LS'
    },
    {
      name: '박지민',
      email: 'jimin.park@email.com',
      amount: 299,
      avatarSrc: 'https://randomuser.me/api/portraits/women/3.jpg',
      avatarFallback: 'PJ'
    },
    {
      name: '최유진',
      email: 'yujin.choi@email.com',
      amount: 99,
      avatarSrc: 'https://randomuser.me/api/portraits/women/4.jpg',
      avatarFallback: 'CY'
    },
    {
      name: '한지훈',
      email: 'jihun.han@email.com',
      amount: 39,
      avatarSrc: 'https://randomuser.me/api/portraits/men/5.jpg',
      avatarFallback: 'HJ'
    }
  ]);


  return (
    <div className="space-y-8 overflow-auto">
      {recentSales.map((sale, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatarSrc} alt="Avatar" />
            <AvatarFallback>{sale.avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">+${sale.amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default RecentSales;