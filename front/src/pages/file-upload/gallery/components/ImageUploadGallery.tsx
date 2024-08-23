import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { X, MoreVertical } from 'lucide-react';

// Modal 스타일 정의
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
};

interface UploadedFile {
  name: string;
  url: string;
  size: number;
}

const ImageUploadGallery: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileToRemove, setFileToRemove] = useState<UploadedFile | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // 옵션 메뉴 상태 관리
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles)
        .filter((file) => {
          if (!validImageTypes.includes(file.type)) {
            alert('PNG, JPG, JPEG 파일만 업로드할 수 있습니다.');
            return false;
          }
          return true;
        })
        .map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size,
        }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = () => {
    if (fileToRemove) {
      setFiles((prevFiles) => prevFiles.filter((file) => file.url !== fileToRemove.url));
      setIsOpen(false);
      setPreviewUrl(null);
      setShowOptions(false); // 옵션 메뉴 닫기
    }
  };

  const handleImageClick = (file: UploadedFile) => {
    setPreviewUrl(file.url);
    setFileToRemove(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const uploadedFiles = event.dataTransfer.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles)
        .filter((file) => {
          if (!validImageTypes.includes(file.type)) {
            alert('PNG, JPG, JPEG 파일만 업로드할 수 있습니다.');
            return false;
          }
          return true;
        })
        .map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size,
        }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const getTotalFileSize = () => {
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    return (totalSize / 1024 / 1024).toFixed(2);
  };

  return (
    <div className="md:p-6 w-full mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none shadow-md"
        >
          이미지 업로드
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".png,.jpg,.jpeg"
          onChange={handleFileUpload}
          className="hidden"
        />
        <p className="text-sm text-gray-500">PNG, JPG, JPEG 파일만 업로드할 수 있습니다.</p>
      </div>

      {files.length === 0 ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="mb-4 p-8 border-4 border-dashed border-gray-300 rounded-lg text-center text-gray-500 items-center justify-center flex h-96"
        >
          이미지를 여기에 드래그하여 업로드하세요
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105"
            >
              <img
                src={file.url}
                alt={file.name}
                className="object-cover w-full h-40 sm:h-48 md:h-56 cursor-pointer"
                onClick={() => handleImageClick(file)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                <span className="text-sm truncate">{file.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-8 text-right text-gray-600">
          <p>총 {files.length}개의 이미지</p>
          <p>총 용량: {getTotalFileSize()} MB</p>
        </div>
      )}

      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col z-50">
          <div className="absolute top-4 right-4 flex space-x-4">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="text-white focus:outline-none"
            >
              <MoreVertical className="h-8 w-8" aria-hidden="true" />
                  </button>
                  
                  <button
              onClick={() => setPreviewUrl(null)}
              className="text-white focus:outline-none"
            >
              <X className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
                
          {/* 이미지 미리보기 */}
          <div className="flex-grow flex items-center justify-center">
            <img src={previewUrl} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-lg" />
          </div>

          {/* 삭제 옵션 메뉴 */}
          {showOptions && (
            <div className="absolute top-16 right-4 bg-white text-black p-3 rounded-lg shadow-lg">
              <button
                onClick={handleRemoveFile}
                className="text-red-600 hover:text-red-700 font-bold focus:outline-none w-full text-left"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="이미지 삭제 확인"
        ariaHideApp={false}
      >
        <h2 className="text-lg font-semibold mb-4">이미지 삭제</h2>
        <p>{fileToRemove?.name} 이미지를 삭제하시겠습니까?</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none shadow-md"
          >
            취소
          </button>
          <button
            onClick={handleRemoveFile}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none shadow-md"
          >
            삭제
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ImageUploadGallery;