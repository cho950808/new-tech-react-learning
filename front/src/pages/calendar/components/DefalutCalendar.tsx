import React, { useState, ReactNode } from 'react';

interface CalendarProps {
  initialYear?: number;
  initialMonth?: number;
}

const DefaultCalendar: React.FC<CalendarProps> = ({ initialYear, initialMonth }) => {
  const today = new Date();
  const [year, setYear] = useState(initialYear ?? today.getFullYear());
  const [month, setMonth] = useState(initialMonth ?? today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const changeMonth = (increment: number) => {
    let newMonth = month + increment;
    let newYear = year;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  const renderCalendar = (): ReactNode[] => {
    const days: ReactNode[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      const isSaturday = dayOfWeek === 6;
      const isSunday = dayOfWeek === 0;
      const isToday = date.toDateString() === today.toDateString();

      days.push(
        <div
          key={day}
          className={`h-10 flex items-center justify-center cursor-pointer transition-colors duration-200 rounded-full
            ${selectedDate?.getTime() === date.getTime()
              ? 'bg-blue-500 text-white'
              : `
                ${isSaturday ? 'text-blue-500' : ''}
                ${isSunday ? 'text-red-500' : ''}
                ${isToday ? 'bg-yellow-200' : ''}
                hover:bg-gray-100
              `
            }
          `}
          onClick={() => setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <div className="header flex justify-between items-center mb-4">
        <button 
          onClick={() => changeMonth(-1)}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          &#9664;
        </button>
        <div className="text-2xl font-bold text-center text-gray-800">
          {new Date(year, month).toLocaleString('ko-KR', { month: 'long', year: 'numeric' })}
        </div>
        <button 
          onClick={() => changeMonth(1)}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          &#9654;
        </button>
      </div>
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
      <div className="days-grid grid grid-cols-7 gap-1">{renderCalendar()}</div>
    </div>
  );
};

export default DefaultCalendar;