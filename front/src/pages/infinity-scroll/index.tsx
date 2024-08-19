import React, { useState, useEffect, useRef } from "react";

// 500개의 목업 데이터를 생성합니다.
const generateMockData = (): string[] => {
  const data: string[] = [];
  for (let i = 1; i <= 500; i++) {
    data.push(`Item ${i}`);
  }
  return data;
};

const mockData = generateMockData();

const InfiniteScroll: React.FC = () => {
  const [items, setItems] = useState<string[]>(mockData.slice(0, 20));
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMoreItems = (): void => {
      if (items.length >= mockData.length) {
        setHasMore(false);
        return;
      }

      const newItems = mockData.slice(items.length, items.length + 20);
      setItems((prevItems) => [...prevItems, ...newItems]);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreItems();
        }
      },
      {
        threshold: 0.8
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [items, hasMore]);

  return (
    <div className="h-screen overflow-auto p-4">
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">무한 스크롤</h1>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition duration-200"
            >
              {item}
            </li>
          ))}
        </ul>
        {hasMore && (
          <div ref={observerRef} className="flex justify-center py-6">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="text-lg font-medium text-gray-600">Loading more items...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;