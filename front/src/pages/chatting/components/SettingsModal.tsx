import React from 'react';

interface SettingsModalProps {
  tempNickname: string;
  setTempNickname: (nickname: string) => void;
  tempChannel: string;
  setTempChannel: (channel: string) => void;
  tempProfilePic: string;
  setTempProfilePic: (url: string) => void;
  handleSetNicknameAndChannel: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  tempNickname,
  setTempNickname,
  tempChannel,
  setTempChannel,
  tempProfilePic,
  setTempProfilePic,
  handleSetNicknameAndChannel,
}) => {
  return (
    <div className="flex flex-col h-full items-center justify-center space-y-6 bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">채팅 설정</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">닉네임</label>
          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            className="w-full rounded-full border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tempNickname}
            onChange={(e) => setTempNickname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">채널 선택</label>
          <select
            className="w-full rounded-full border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tempChannel}
            onChange={(e) => setTempChannel(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Tech Talk">Tech Talk</option>
            <option value="Random">Random</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">프로필 사진</label>
          <input
            type="text"
            placeholder="프로필 사진 URL 입력"
            className="w-full rounded-full border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tempProfilePic}
            onChange={(e) => setTempProfilePic(e.target.value)}
          />
        </div>
        <button
          onClick={handleSetNicknameAndChannel}
          className="w-full py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
        >
          채팅 시작
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;