import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useSpring, animated } from '@react-spring/web';

const formatNumber = (num: number): string => {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface DashboardCardProps {
  title: string;
  value: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
  const props = useSpring({ number: value, from: { number: 0 }, config: { tension: 170, friction: 26 } });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <animated.div className="text-2xl font-bold">
          {props.number.to((n) => formatNumber(n))}
        </animated.div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;