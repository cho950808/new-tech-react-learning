export interface CardData {
  title: string;
  value: number;
}


export const cardsData = (
  revenue: number,
  subscriptions: number,
  sales: number,
  activeNow: number
): CardData[] => [
  {
    title: "총 수익",
    value: revenue,
  },
  {
    title: "구독",
    value: subscriptions,
  },
  {
    title: "판매",
    value: sales,
  },
  {
    title: "현재 활성 사용자",
    value: activeNow,
  }
];