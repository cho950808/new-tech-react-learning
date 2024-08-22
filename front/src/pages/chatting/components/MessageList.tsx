import React, { useMemo, useRef, useEffect } from 'react';

interface MessageListProps {
  messages: Message[];
  searchTerm: string;
  nickname: string;
}

const MessageList: React.FC<MessageListProps> = (props) => {
  const { messages, searchTerm, nickname } = props;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderedMessages = useMemo(() => (
    messages.map((message) => {
      const isOwnMessage = message.sender === nickname;
      const highlightedText = searchTerm
        ? message.text.replace(
          new RegExp(`(${searchTerm})`, 'gi'),
          (match) => `<span class="bg-yellow-300">${match}</span>`
        )
        : message.text;

      return (
        <div
          key={message.id}
          className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} items-end space-x-2`}
        >
          {!isOwnMessage && (
            <img
              src={message.avatar}
              alt={`${message.sender} 프로필`}
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <div className="flex flex-col">
            <div
              className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                isOwnMessage ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
              {message.isFile && (
                message.isImage ? (
                  <img
                    src={message.fileUrl}
                    alt="Uploaded file"
                    className="max-w-full h-auto rounded-lg mt-2"
                    onLoad={scrollToBottom}
                  />
                ) : (
                  <a href={message.fileUrl} download className="text-blue-500 underline">
                    파일 다운로드
                  </a>
                )
              )}
            </div>
            <span
              className={`text-xs text-gray-500 ${
                isOwnMessage ? 'text-right mr-2 mt-1' : 'text-left ml-2 mt-1'
              }`}
            >
              {message.time}
            </span>
          </div>
          {isOwnMessage && (
            <img
              src={message.avatar}
              alt={`${message.sender} 프로필`}
              className="w-10 h-10 rounded-full ml-4"
            />
          )}
        </div>
      );
    })
  ), [messages, searchTerm, nickname]);

  return (
    <div className="flex-grow p-4 overflow-y-auto space-y-4">
      {renderedMessages}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;