import { useEffect, useMemo, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import PageHead from '@/components/shared/page-head';
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
} from '@/components/ui/tabs';
import { cardsData } from '@/constants/cardsData';

import RecentSales from './components/RecentSales';
import DashboardCard from './components/DashboardCard';
import ActivityLog from './components/ActivityLog';
import GoalsProgress from './components/GoalsProgress';

export default function DashboardPage() {
  const [revenue, setRevenue] = useState<number>(45231.89);
  const [subscriptions, setSubscriptions] = useState<number>(2350);
  const [sales, setSales] = useState<number>(12234);
  const [activeNow, setActiveNow] = useState<number>(573);
  const [chartData, setChartData] = useState<number[]>([45231.89]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRevenue = revenue + (Math.random() - 0.5) * 2000;
      setRevenue(newRevenue);
      setSubscriptions(prev => prev + Math.floor((Math.random() - 0.5) * 200));
      setSales(prev => prev + Math.floor((Math.random() - 0.5) * 1000));
      setActiveNow(prev => prev + Math.floor((Math.random() - 0.5) * 100));
      setChartData(prev => [...prev, newRevenue]);
      // 5초마다 업데이트
    }, 5000);
    return () => clearInterval(interval);
  }, [revenue]);

  const cardItems = cardsData(revenue, subscriptions, sales, activeNow);

  const generateChartData = (data: number[]) => ({
    labels: Array.from({ length: data.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Revenue',
        data: data,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  useMemo(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: generateChartData(chartData),
        });
      }
    }

    return () => {
      if (chartInstance.current) chartInstance.current.destroy()
    }
  }, [chartData]);

  return (
    <>
      <PageHead title="대시보드 | 앱" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
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
                  <canvas ref={chartRef}></canvas>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>최근 판매</CardTitle>
                  <CardDescription>이번 달에 265개의 판매를 했습니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-9">
              <ActivityLog />
              <GoalsProgress />

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>최신 뉴스</CardTitle>
                  <CardDescription>업계 최신 소식입니다.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}