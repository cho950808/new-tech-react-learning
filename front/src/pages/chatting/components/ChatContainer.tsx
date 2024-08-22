import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SettingsModal from './SettingsModal';

const socket = io('http://localhost:4001');

interface Message {
  id: string;
  text: string;
  sender: string;
  avatar: string;
  time: string;
  isFile?: boolean;
  isImage?: boolean;
  fileUrl?: string;
}

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string>('https://via.placeholder.com/40');
  const [channel, setChannel] = useState<string | null>(null);
  const [tempNickname, setTempNickname] = useState('');
  const [tempChannel, setTempChannel] = useState('General');
  const [tempProfilePic, setTempProfilePic] = useState<string>('https://via.placeholder.com/40');

  useEffect(() => {
    const handleMessage = (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on('chat message', handleMessage);

    return () => {
      socket.off('chat message', handleMessage);
    };
  }, []);

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() !== '' && nickname && channel) {
      const time = getCurrentTime();
      const msg = {
        id: `${Date.now()}-${Math.random()}`,
        text: newMessage,
        sender: nickname,
        avatar: profilePic,
        time,
      };
      socket.emit('chat message', msg);
      setNewMessage('');
    }
  }, [newMessage, nickname, channel, profilePic]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !isComposing) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage, isComposing]
  );

  const handleFileUpload = useCallback(async (file: File) => {
    if (file && nickname && channel) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:4001/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        const fileUrl = data.fileUrl;
        const isImage = file.type.startsWith('image/');
        const time = getCurrentTime();
        const msg: Message = {
          id: `${Date.now()}-${Math.random()}`,
          text: '',
          sender: nickname,
          avatar: profilePic,
          isFile: true,
          isImage,
          fileUrl,
          time,
        };

        socket.emit('chat message', msg);
        setNewMessage('');
      } catch (error) {
        console.error('파일 업로드 실패:', error);
      }
    }
  }, [nickname, channel, profilePic]);

  const handleSetNicknameAndChannel = useCallback(() => {
    if (tempNickname.trim() !== '' && tempChannel.trim() !== '') {
      setNickname(tempNickname);
      setChannel(tempChannel);
      setProfilePic(tempProfilePic);
    }
  }, [tempNickname, tempChannel, tempProfilePic]);

  if (!nickname || !channel) {
    return (
      <SettingsModal
        tempNickname={tempNickname}
        setTempNickname={setTempNickname}
        tempChannel={tempChannel}
        setTempChannel={setTempChannel}
        tempProfilePic={tempProfilePic}
        setTempProfilePic={setTempProfilePic}
        handleSetNicknameAndChannel={handleSetNicknameAndChannel}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        profilePic={profilePic}
        nickname={nickname}
        channel={channel}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />
      <MessageList
        messages={messages}
        searchTerm={searchTerm}
        nickname={nickname}
      />
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        handleFileUpload={handleFileUpload}
        handleKeyDown={handleKeyDown}
        isComposing={isComposing}
        setIsComposing={setIsComposing}
      />
    </div>
  );
};

export default ChatContainer;