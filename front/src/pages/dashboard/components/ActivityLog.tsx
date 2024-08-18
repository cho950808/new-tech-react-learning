import { useEffect, useState } from 'react';
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface ActivityLogItem {
  timestamp: string;
  activity: string;
}

const Log = ({ activities, highlighted }: { activities: ActivityLogItem[], highlighted: number[] }) => {
  const maxVisibleItems = 5;

  return (
    <div>
      <ul>
        {activities.slice(0, maxVisibleItems).map((activity, index) => (
          <li
            key={index}
            style={{
              color: highlighted.includes(index) ? 'red' : 'black',
              transition: 'color 2s',
            }}
          >
            {activity.timestamp}: {activity.activity}
          </li>
        ))}
        {activities.length > maxVisibleItems && (
          <li>...</li>
        )}
      </ul>
    </div>
  );
};

const ActivityLog = () => {
  const initialActivities: ActivityLogItem[] = [
    { timestamp: "2024-08-13 12:34:56", activity: "사용자 A가 가입했습니다." },
    { timestamp: "2024-08-12 11:33:45", activity: "사용자 B가 구매를 완료했습니다." },
    { timestamp: "2024-08-11 10:32:34", activity: "사용자 C가 리뷰를 남겼습니다." },
    { timestamp: "2024-08-10 09:31:23", activity: "사용자 D가 비밀번호를 변경했습니다." },
  ];

  const [activities, setActivities] = useState<ActivityLogItem[]>(initialActivities);
  const [highlighted, setHighlighted] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        activity: `사용자 ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}가 새로운 활동을 했습니다.`,
      };

      setActivities(prev => [newActivity, ...prev].slice(0, 10));
      setHighlighted(prev => [0, ...prev.map(index => index + 1)]);

      setTimeout(() => {
        setHighlighted(prev => prev.slice(1));
      }, 5000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>사용자 활동</CardTitle>
        <CardDescription>최근 사용자 활동 로그입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Log activities={activities} highlighted={highlighted} />
      </CardContent>
    </Card>
  );
}

export default ActivityLog;