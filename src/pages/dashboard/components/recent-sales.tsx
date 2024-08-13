import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Sale {
  name: string;
  email: string;
  amount: number;
  avatarSrc: string;
  avatarFallback: string;
}

interface RecentSalesProps {
  data: Sale[];
}

const RecentSales: FC<RecentSalesProps> = ({ data }) => {
  return (
    <div className="space-y-8 overflow-auto">
      {data.map((sale, index) => (
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