import React from 'react';
import { Search } from 'lucide-react';

interface ChatHeaderProps {
  profilePic: string;
  nickname: string;
  channel: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  profilePic, 
  nickname, 
  channel, 
  searchTerm, 
  setSearchTerm, 
  isFocused, 
  setIsFocused 
}) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={profilePic}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="text-lg font-semibold">{nickname}</div>
            <div className="text-gray-500">{channel}</div>
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
  );
};

export default ChatHeader;