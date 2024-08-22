import React from 'react';
import { Plus, Send } from 'lucide-react';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleFileUpload: (file: File) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isComposing: boolean;
  setIsComposing: (isComposing: boolean) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleFileUpload,
  handleKeyDown,
  isComposing,
  setIsComposing,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
    if (e.type === 'compositionstart') {
      setIsComposing(true);
    } else if (e.type === 'compositionend') {
      setIsComposing(false);
    }
  };

  return (
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
        onChange={handleFileChange}
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
  );
};

export default MessageInput;