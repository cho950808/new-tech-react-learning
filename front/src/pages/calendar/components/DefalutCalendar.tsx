import React, { useState, ReactNode, useCallback } from 'react';

interface CalendarProps {
  initialYear?: number;
  initialMonth?: number;
}

const holidays = [
  { date: '2024-01-01', name: 'New Year\'s Day' },
  { date: '2024-12-25', name: 'Christmas Day' },
  // Add more holidays here...
];

const CalendarDay: React.FC<{
  day: number;
  date: Date;
  selectedDate: Date | null;
  isSaturday: boolean;
  isSunday: boolean;
  isHoliday: boolean;
  isToday: boolean;
  onClick: (date: Date) => void;
}> = React.memo(({ day, date, selectedDate, isSaturday, isSunday, isHoliday, isToday, onClick }) => {
  return (
    <div
      className={`h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 rounded-full
        ${selectedDate?.getTime() === date.getTime()
          ? 'bg-blue-500 text-white'
          : `
            ${isHoliday ? 'bg-red-100 text-red-500' : ''}
            ${isSaturday ? 'text-blue-500' : ''}
            ${isSunday ? 'text-red-500' : ''}
            ${isToday ? 'bg-yellow-200' : ''}
            hover:bg-gray-100
          `
        }
      `}
      onClick={() => onClick(date)}
    >
      {day}
    </div>
  );
});

const DefaultCalendar: React.FC<CalendarProps> = ({ initialYear, initialMonth }) => {
  const today = new Date();
  const [year, setYear] = useState(initialYear ?? today.getFullYear());
  const [month, setMonth] = useState(initialMonth ?? today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [animating, setAnimating] = useState(false);
  const [tempMonth, setTempMonth] = useState(month);
  const [tempYear, setTempYear] = useState(year);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const daysInMonth = new Date(tempYear, tempMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(tempYear, tempMonth, 1).getDay();

  const changeMonth = (increment: number) => {
    setAnimating(true);
    setDirection(increment > 0 ? 'right' : 'left');

    let newMonth = month + increment;
    let newYear = year;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setTempMonth(newMonth);
    setTempYear(newYear);

    setTimeout(() => {
      setMonth(newMonth);
      setYear(newYear);
      setAnimating(false);
    }, 500); // 애니메이션 지속 시간을 500ms로 설정
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
    setTempYear(Number(e.target.value));
  };

  const renderCalendar = useCallback((): ReactNode[] => {
    const days: ReactNode[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(tempYear, tempMonth, day);
      const dayOfWeek = date.getDay();
      const isSaturday = dayOfWeek === 6;
      const isSunday = dayOfWeek === 0;
      const isToday = date.toDateString() === today.toDateString();
      const isHoliday = holidays.some(holiday => holiday.date === date.toISOString().split('T')[0]);

      days.push(
        <CalendarDay
          key={day}
          day={day}
          date={date}
          selectedDate={selectedDate}
          isSaturday={isSaturday}
          isSunday={isSunday}
          isToday={isToday}
          isHoliday={isHoliday}
          onClick={setSelectedDate}
        />
      );
    }

    return days;
  }, [daysInMonth, firstDayOfMonth, tempMonth, selectedDate, today, tempYear]);

  return (
    <div className="calendar bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <div className="header flex justify-between items-center mb-4">
        <button 
          onClick={() => changeMonth(-1)}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          &#9664;
        </button>
        <div className="flex items-center">
          <select 
            value={year}
            onChange={handleYearChange}
            className="text-xl font-bold text-center text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <span className="ml-2 text-2xl font-bold text-gray-800">
            {new Date(year, month).toLocaleString('ko-KR', { month: 'long' })}
          </span>
        </div>
        <button 
          onClick={() => changeMonth(1)}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          &#9654;
        </button>
      </div>
      <div className="relative overflow-hidden h-64">
        <div
          className={`absolute inset-0 transition-transform duration-500 ease-in-out transform 
            ${animating ? 'opacity-0' : 'opacity-100'} 
            ${animating ? (direction === 'right' ? 'translate-x-full' : '-translate-x-full') : 'translate-x-0'}
            `}
        >
          <div className="days-of-week grid grid-cols-7 gap-1 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <div
                key={day}
                className={`text-center font-medium 
                  ${index === 6 ? 'text-blue-500' : ''}
                  ${index === 0 ? 'text-red-500' : 'text-gray-500'}
                `}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="days-grid grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>
      </div>
      {selectedDate && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center transition-opacity duration-500">
          <h3 className="text-lg font-semibold">
            {selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
          </h3>
          <p className="text-gray-700">
            {holidays.find(holiday => holiday.date === selectedDate.toISOString().split('T')[0])?.name || 'No special events'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DefaultCalendar;