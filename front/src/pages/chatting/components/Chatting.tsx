import { useState, useCallback, useMemo, useEffect, useRef } from 'react';

const Chatting = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '채팅에 오신 것을 환영합니다!', sender: '관리자', avatar: 'https://via.placeholder.com/40?text=A' },
    { id: 2, text: '안녕하세요, 무엇을 도와드릴까요?', sender: '관리자', avatar: 'https://via.placeholder.com/40?text=A' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: newMessage, sender: '사용자', avatar: 'https://via.placeholder.com/40?text=U' },
      ]);
      setNewMessage('');
    }
  }, [newMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage, isComposing]);

  const handleComposition = useCallback((e) => {
    if (e.type === 'compositionstart') setIsComposing(true);
    else if (e.type === 'compositionend') setIsComposing(false);
  }, []);

  const renderedMessages = useMemo(() => (
    messages.map((message) => (
      <div
        key={message.id}
        className={`flex ${message.sender === '관리자' ? 'justify-start' : 'justify-end'} items-center`}
      >
        {message.sender === '관리자' && (
          <img
            src={message.avatar}
            alt="관리자 프로필"
            className="w-10 h-10 rounded-full mr-4"
          />
        )}
        <div
          className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
            message.sender === '관리자'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {message.text}
        </div>
        {message.sender === '사용자' && (
          <img
            src={message.avatar}
            alt="사용자 프로필"
            className="w-10 h-10 rounded-full ml-4"
          />
        )}
      </div>
    ))
  ), [messages]);

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl">
        <div className="p-4 border-b border-gray-200">
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
        </div>
        <div className="flex flex-col h-96 p-4 overflow-y-auto space-y-4">
          {renderedMessages}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-6 bg-gray-100 flex items-center">
          <input
            type="text"
            className="flex-grow rounded-full border-gray-400 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="메시지를 입력하세요..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown} // 엔터 처리
            onCompositionStart={handleComposition} // 한글 입력 시작
            onCompositionEnd={handleComposition} // 한글 입력 완료
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-600 text-white rounded-full px-6 py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;