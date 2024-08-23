import React, { useState, useRef } from 'react';

interface UploadedFile {
  name: string;
  url: string;
  size: number;
}

const FileUploadGallery: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size,
      }));
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (fileToRemove: UploadedFile) => {
    setFiles(prevFiles => prevFiles.filter(file => file.url !== fileToRemove.url));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const uploadedFiles = event.dataTransfer.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size,
      }));
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
  };

  const getTotalFileSize = () => {
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    return (totalSize / 1024 / 1024).toFixed(2); // MB 단위로 변환
  };

  return (
    <div className="p-6 w-full mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none shadow-lg"
        >
          파일 업로드
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
        <p className="text-sm text-gray-500">최대 10개의 파일을 업로드할 수 있습니다.</p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="mb-4 p-4 border-4 border-dashed border-gray-300 rounded-lg text-center text-gray-500 h-full"
      >
        파일을 여기에 드래그하여 업로드하세요
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {files.map((file, index) => (
          <div key={index} className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105">
            <img
              src={file.url}
              alt={file.name}
              className="object-cover w-full h-40 sm:h-48 md:h-56 cursor-pointer"
              onDoubleClick={() => handlePreview(file.url)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition duration-300 flex items-center justify-center">
              <button
                onClick={() => handleRemoveFile(file)}
                className="bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none shadow-md hover:bg-red-700"
              >
                삭제
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
              <span className="text-sm truncate">{file.name}</span>
            </div>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <div className="mt-8 text-right text-gray-600">
          <p>총 {files.length}개의 파일</p>
          <p>총 용량: {getTotalFileSize()} MB</p>
        </div>
      )}

      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img src={previewUrl} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-lg" />
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-2 right-2 bg-red-600 text-white font-bold py-1 px-2 rounded-full focus:outline-none shadow-md hover:bg-red-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadGallery;