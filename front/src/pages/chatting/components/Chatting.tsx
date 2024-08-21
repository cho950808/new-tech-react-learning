import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Search, Plus, Send } from 'lucide-react'; // lucide-react의 아이콘 사용

interface Message {
  id: number;
  text: string;
  sender: string;
  avatar: string;
  time: string;
  isFile?: boolean;
  isImage?: boolean;
}

const Chatting: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '채팅에 오신 것을 환영합니다!', sender: '관리자', avatar: 'https://via.placeholder.com/40?text=A', time: '10:00' },
    { id: 2, text: '안녕하세요, 무엇을 도와드릴까요?안녕하세요, 무엇을 도와드릴까요?안녕하세요, 무엇을 도와드릴까요?안녕하세요, 무엇을 도와드릴까요?', sender: '관리자', avatar: 'https://via.placeholder.com/40?text=A', time: '10:01' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = (): string => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() !== '') {
      const time = getCurrentTime();
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: newMessage, sender: '사용자', avatar: 'https://via.placeholder.com/40?text=U', isFile: false, time },
      ]);
      setNewMessage('');
    }
  }, [newMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !isComposing) {
        e.preventDefault(); // 기본 동작 방지
        handleSendMessage();
      }
    },
    [handleSendMessage, isComposing]
  );

  const handleComposition = useCallback((e: React.CompositionEvent<HTMLInputElement>) => {
    if (e.type === 'compositionstart') setIsComposing(true);
    else if (e.type === 'compositionend') setIsComposing(false);
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const isImage = file.type.startsWith('image/');
      const time = getCurrentTime();
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: fileUrl, sender: '사용자', avatar: 'https://via.placeholder.com/40?text=U', isFile: true, isImage, time },
      ]);
      // 스크롤을 맨 아래로 이동
      setTimeout(() => {
        scrollToBottom();
      }, 100); // 이미지 로드 시간을 고려하여 약간의 딜레이 추가
    }
  }, []);

  const renderedMessages = useMemo(() => (
    messages.map((message) => {
      const highlightedText = searchTerm
        ? message.text.replace(
            new RegExp(`(${searchTerm})`, 'gi'),
            (match) => `<span class="bg-yellow-300">${match}</span>`
          )
        : message.text;

      return (
        <div
          key={message.id}
          className={`flex ${message.sender === '관리자' ? 'justify-start' : 'justify-end'} items-end space-x-2`}
        >
          {message.sender === '관리자' && (
            <img
              src={message.avatar}
              alt="관리자 프로필"
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <div className="flex flex-col">
            <div
              className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                message.sender === '관리자'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
              {message.isFile ? (
                message.isImage ? (
                  <img
                    src={message.text}
                    alt="Uploaded file"
                    className="max-w-full h-auto rounded-lg mt-2"
                    onLoad={scrollToBottom}
                  />
                ) : (
                  <a href={message.text} download className="text-blue-500 underline">
                    파일 다운로드
                  </a>
                )
              ) : null}
            </div>
            <span
              className={`text-xs text-gray-500 ${
                message.sender === '관리자' ? 'text-left ml-2 mt-1' : 'text-right mr-2 mt-1'
              }`}
            >
              {message.time}
            </span>
          </div>
          {message.sender === '사용자' && (
            <img
              src={message.avatar}
              alt="사용자 프로필"
              className="w-10 h-10 rounded-full ml-4"
            />
          )}
        </div>
      );
    })
  ), [messages, searchTerm]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex items-center justify-center p-3 h-full">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-lg font-semibold">사용자 이름</div>
                  <div className="text-gray-500">고객</div>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="rounded-full border-gray-300 p-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{ width: isFocused ? '220px' : '120px' }}
                />
                <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300" />
              </div>
            </div>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {renderedMessages}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-6 bg-gray-100 flex items-center space-x-4">
            <label
              htmlFor="file-upload"
              className="flex items-center bg-gray-600 text-white rounded-full px-4 py-2 cursor-pointer hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <Plus className="w-6 h-6" />
            </label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="flex items-center w-full space-x-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  className="w-full rounded-full border-gray-400 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 pr-24"
                  placeholder="메시지를 입력하세요..."
                  value={newMessage}
                  maxLength={1000}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onCompositionStart={handleComposition}
                  onCompositionEnd={handleComposition}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 ml-2">
                  {newMessage.length}/1000자
                </span>
              </div>
              <div>
                <button
                  onClick={handleSendMessage}
                  className="flex items-center rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-5 h-5 mr-2" />
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatting;