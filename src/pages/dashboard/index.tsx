import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import PageHead from '@/components/shared/page-head.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.js';
import RecentSales from './components/recent-sales';
import { cardsData, CardData } from '@/constants/cardsData';


interface Sale {
  name: string;
  email: string;
  amount: number;
  avatarSrc: string;
  avatarFallback: string;
}


const DashboardCard = ({ title, value }: { title: string; value: number; }) => {
  const props = useSpring({ number: value, from: { number: 0 }, config: { tension: 170, friction: 26 } });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <animated.div className="text-2xl font-bold">
          {props.number.to((n) => n.toFixed(2))}
        </animated.div>
      </CardContent>
    </Card>
  );
};


export default function DashboardPage() {
  const [revenue, setRevenue] = useState<number>(45231.89);
  const [subscriptions, setSubscriptions] = useState<number>(2350);
  const [sales, setSales] = useState<number>(12234);
  const [activeNow, setActiveNow] = useState<number>(573);
  const [recentSales, setRecentSales] = useState<Sale[]>([
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

  useEffect(() => {
    const interval = setInterval(() => {
      // 모의 데이터 업데이트
      setRevenue(prev => prev + Math.random() * 1000);
      setSubscriptions(prev => prev + Math.floor(Math.random() * 100));
      setSales(prev => prev + Math.floor(Math.random() * 500));
      setActiveNow(prev => prev + Math.floor(Math.random() * 50));
      setRecentSales(prev => prev.map(sale => ({ ...sale, amount: sale.amount + Math.floor(Math.random() * 10) })));
    }, 5000); // 5초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  
  const cardItems = cardsData(revenue, subscriptions, sales, activeNow);

  return (
    <>
      <PageHead title="대시보드 | 앱" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="analytics" disabled>분석</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {cardItems.map((card, index) => (
                <DashboardCard
                  key={index}
                  title={card.title}
                  value={card.value}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>개요</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <Overview /> */}
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>최근 판매</CardTitle>
                  <CardDescription>이번 달에 265개의 판매를 했습니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales data={recentSales} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}