import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';


interface Goal {
  name: string;
  progress: string;
}

const Status = ({ goals }: { goals: Goal[] }) => {
  return (
    <div>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            {goal.name}: {goal.progress} 달성
          </li>
        ))}
      </ul>
    </div>
  )
}

const GoalsProgress = () => {
  const goals: Goal[] = [
    { name: "매출 목표", progress: "70%" },
    { name: "구독 목표", progress: "50%" },
    { name: "판매 목표", progress: "80%" },
    { name: "고객 만족도 목표", progress: "90%" },
    { name: "신규 가입자 목표", progress: "60%" },
    { name: "리뷰 수 목표", progress: "75%" },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>목표 추적</CardTitle>
        <CardDescription>현재 목표 달성 상태를 추적합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Status goals={goals} />
      </CardContent>
    </Card>
  )
}

export default GoalsProgress