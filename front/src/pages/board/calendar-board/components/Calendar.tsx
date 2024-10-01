import { FC, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import dayjs, { Dayjs } from 'dayjs';
import { twMerge } from 'tailwind-merge';
import 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('ko');
dayjs.extend(localizedFormat);

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];


const CalendarHeader: FC<{
  currentDate: Dayjs;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}> = ({ currentDate, onPreviousMonth, onNextMonth }) => (
  <div className="sticky top-0 z-10 flex justify-between items-center py-4 px-8 bg-gray-700 text-white shadow-md">
    <button
      onClick={onPreviousMonth}
      className="text-lg font-bold transition-transform transform hover:scale-110"
    >
      ◀
    </button>
    <span className="text-2xl font-semibold">{currentDate.format('YYYY년 MMMM')}</span>
    <button
      onClick={onNextMonth}
      className="text-lg font-bold transition-transform transform hover:scale-110"
    >
      ▶
    </button>
  </div>
);

const DayLabels: FC = () => (
  <div className="sticky top-[4rem] z-10 grid grid-cols-7 gap-2 text-center text-gray-700 text-sm font-medium py-2 bg-gray-200">
    {daysOfWeek.map((day, index) => (
      <div
        key={index}
        className={twMerge(
          index === 0 && "text-red-500",
          index === 6 && "text-blue-500"
        )}
      >
        {day}
      </div>
    ))}
  </div>
);

const DateCell: FC<{
  date: Dayjs;
  currentDate: Dayjs;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  onClick: () => void;
  eventContent: string;
}> = ({
  date,
  currentDate,
  isSelected,
  isInRange,
  isRangeStart,
  isRangeEnd,
  onClick,
  eventContent,
}) => {
  const isCurrentMonth = date.isSame(currentDate, 'month');

  const cellClasses = twMerge(
    "relative flex flex-col items-end justify-start p-2 rounded-lg cursor-pointer border transition-transform transform hover:scale-105 duration-200 flex-grow min-h-[5rem]",
    isSelected ? "bg-blue-400 text-white" : isInRange ? "bg-blue-100 text-blue-800" : "text-gray-800 hover:bg-gray-100",
    !isCurrentMonth && "text-gray-400",
    date.day() === 0 && "text-red-500",
    date.day() === 6 && "text-blue-500",
    isRangeStart && "rounded-l-lg",
    isRangeEnd && "rounded-r-lg"
  );

  return (
    <div onClick={onClick} className={cellClasses}>
      <div className="absolute top-1 right-2 text-sm">{date.format('D')}</div>
      {eventContent && (
        <div className="mt-auto w-full bg-gray-200 rounded-md p-2 text-sm text-gray-700 truncate">
          {eventContent}
        </div>
      )}
    </div>
  );
};

const Calendar: FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
  const [eventContent, setEventContent] = useState('');
const [events, setEvents] = useState<{ [key: string]: string }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const startDay = currentDate.startOf('month').startOf('week');
  const endDay = currentDate.endOf('month').endOf('week');
  const days: Dayjs[] = [];

  for (let date = startDay; date.isBefore(endDay); date = date.add(1, 'day')) {
    days.push(date);
  }

  const handleDateClick = (date: Dayjs) => {
    if (events[date.format('YYYY-MM-DD')]) {
      setSelectedStartDate(date);
      setSelectedEndDate(date);
      setEventContent(events[date.format('YYYY-MM-DD')]);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(date);
      setEventContent('');
    }
    setIsDialogOpen(true);
  };

  const handleSaveEvent = () => {
    if (selectedStartDate && selectedEndDate) {
      const range: string[] = [];
      for (let date = selectedStartDate; date.isBefore(selectedEndDate) || date.isSame(selectedEndDate, 'day'); date = date.add(1, 'day')) {
        range.push(date.format('YYYY-MM-DD'));
      }

      setEvents((prevEvents) => {
        const updatedEvents: { [key: string]: string } = { ...prevEvents };
        range.forEach((date) => {
          updatedEvents[date] = eventContent;
        });
        return updatedEvents;
      });

      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setEventContent('');
      setIsDialogOpen(false);
    }
  };

  return (
     <div className="min-h-screen h-screen flex items-center justify-center">
      <div className="h-full w-full max-w-screen-xl mx-auto flex flex-col">
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={() => setCurrentDate(currentDate.subtract(1, 'month'))}
          onNextMonth={() => setCurrentDate(currentDate.add(1, 'month'))}
        />
        <DayLabels />
        <div className="grid grid-cols-7 gap-1 p-2 bg-white flex-grow">
          {days.map((date) => {
            const isSelected = selectedStartDate && date.isSame(selectedStartDate, 'day');
            const isInRange = selectedStartDate && selectedEndDate && date.isAfter(selectedStartDate) && date.isBefore(selectedEndDate);
            const isRangeStart = selectedStartDate && date.isSame(selectedStartDate, 'day');
            const isRangeEnd = selectedEndDate && date.isSame(selectedEndDate, 'day');

            return (
              <DateCell
                key={date.format('YYYY-MM-DD')}
                date={date}
                currentDate={currentDate}
                isSelected={!!isSelected}
                isInRange={!!isInRange}
                isRangeStart={!!isRangeStart}
                isRangeEnd={!!isRangeEnd}
                onClick={() => handleDateClick(date)}
                eventContent={events[date.format('YYYY-MM-DD')] || ''}
              />
            );
          })}
        </div>
      </div>

      {/* 모달 창 */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          {/* 오버레이 */}
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-10" />
          
          {/* 모달 콘텐츠 */}
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-md w-full z-20">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-lg font-semibold">
                이벤트 날짜 범위 선택
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="mt-2 text-gray-500">
              이벤트를 추가하거나 수정할 날짜 범위를 선택하세요.
            </Dialog.Description>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">시작 날짜</label>
              <input
                type="date"
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={selectedStartDate ? selectedStartDate.format('YYYY-MM-DD') : ''}
                onChange={(e) => setSelectedStartDate(dayjs(e.target.value))}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">종료 날짜</label>
              <input
                type="date"
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={selectedEndDate ? selectedEndDate.format('YYYY-MM-DD') : ''}
                onChange={(e) => setSelectedEndDate(dayjs(e.target.value))}
              />
            </div>

            {/* 이벤트 내용 입력 */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">이벤트 내용</label>
              <textarea
                className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={4}
                value={eventContent}
                onChange={(e) => setEventContent(e.target.value)}
                placeholder="이벤트 내용을 입력하세요"
              />
            </div>

            {/* 저장 버튼 */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveEvent}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                저장
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Calendar;