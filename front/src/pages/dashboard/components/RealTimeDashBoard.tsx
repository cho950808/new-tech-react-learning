import React, { useEffect, useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Chart from 'chart.js/auto';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // 서버 주소

interface MockData {
  revenue: number;
  users: number;
  sales: number;
}

const RealTimeDashboard: React.FC = () => {
  const [mockData, setMockData] = useState<MockData>({
    revenue: 10000,
    users: 1000,
    sales: 500,
  });

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    socket.on('data', (newData: MockData) => {
      setMockData(newData);
    });

    return () => {
      socket.off('data');
    };
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Revenue', 'Users', 'Sales'],
            datasets: [
              {
                label: 'Values',
                data: [mockData.revenue, mockData.users, mockData.sales],
                backgroundColor: [
                  'rgba(75,192,192,0.2)',
                  'rgba(153,102,255,0.2)',
                  'rgba(255,159,64,0.2)'
                ],
                borderColor: [
                  'rgba(75,192,192,1)',
                  'rgba(153,102,255,1)',
                  'rgba(255,159,64,1)'
                ],
                borderWidth: 1,
              }
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [mockData]);

  return (
    <div className="App">
      <Card>
        <CardHeader>
          <CardTitle>실시간 데이터 모니터링 대시보드</CardTitle>
        </CardHeader>
        <CardContent>
          <canvas ref={chartRef} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeDashboard;