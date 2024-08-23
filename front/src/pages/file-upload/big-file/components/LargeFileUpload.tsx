import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface UploadedFile {
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'complete';
  url: string;
  type: string;
}

const LargeFileUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 관리
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const maxFileSize = 1024 * 1024 * 2048; // 2GB 제한

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles: UploadedFile[] = Array.from(uploadedFiles)
        .map((file) => {
          if (file.size > maxFileSize) {
            setError('파일 크기가 2GB를 초과할 수 없습니다.');
            return null;
          } else {
            setError(null);
            return {
              name: file.name,
              size: file.size,
              progress: 0,
              status: 'uploading',
              url: URL.createObjectURL(file),
              type: file.type,
            };
          }
        })
        .filter(Boolean) as UploadedFile[];

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      uploadFiles(newFiles);
    }
  };

  const formatFileSize = (size: number) => {
    if (size >= 1024 * 1024 * 1024) {
      return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    } else if (size >= 1024 * 1024) {
      return (size / 1024 / 1024).toFixed(2) + ' MB';
    } else if (size >= 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else {
      return size + ' B';
    }
  };

  const uploadFiles = (filesToUpload: UploadedFile[]) => {
    filesToUpload.forEach((file, index) => {
      const fakeUploadProgress = setInterval(() => {
        setFiles((prevFiles) =>
          prevFiles.map((f, i) =>
            f.name === file.name
              ? {
                  ...f,
                  progress: Math.min(f.progress + 10, 100),
                  status: f.progress >= 90 ? 'complete' : 'uploading',
                }
              : f
          )
        );
      }, 200);

      setTimeout(() => {
        clearInterval(fakeUploadProgress);
        setFiles((prevFiles) =>
          prevFiles.map((f, i) =>
            f.name === file.name
              ? { ...f, progress: 100, status: 'complete' }
              : f
          )
        );
      }, 2000);
    });
  };

  const handleRemoveFile = (fileToRemove: UploadedFile) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    if (previewUrl === fileToRemove.url) {
      setPreviewUrl(null);
      setPreviewType(null);
    }
  };

  const handlePreview = (file: UploadedFile) => {
    setLoading(true); // 로딩 상태 시작
    setPreviewUrl(file.url);
    setPreviewType(file.type);
    setTimeout(() => {
      setLoading(false); // 로딩 완료 후 로딩 상태 종료
    }, 1000); // 로딩 시간 시뮬레이션 (실제 환경에서는 파일 로드 완료 시점에 맞춰 설정)
  };

  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Left Side */}
      <div className="w-2/3 p-8 flex flex-col bg-white shadow-lg">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-8 rounded-full transition duration-300 ease-in-out"
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
          <p className="text-sm text-gray-400">최대 2GB 파일을 업로드할 수 있습니다.</p>
        </div>

        {error && (
          <div className="mb-6 text-red-600 bg-red-100 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm table-fixed">
            <thead className="bg-indigo-100 text-indigo-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left w-1/3">파일 이름</th>
                <th className="py-3 px-6 text-left w-1/6">파일 크기</th>
                <th className="py-3 px-6 text-left w-1/3">진행률</th>
                <th className="py-3 px-6 text-left w-1/6">작업</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {files.map((file, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 hover:bg-gray-100 transition ${loading ? 'cursor-not-allowed' : ''}`}
                >
                  <td
                    className={`py-3 px-6 text-left cursor-pointer ${loading ? 'pointer-events-none' : ''}`}
                    onClick={() => !loading && handlePreview(file)}
                  >
                    {file.name}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {formatFileSize(file.size)}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="flex-grow bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {file.status === 'complete' ? '완료' : `${file.progress}%`}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => handleRemoveFile(file)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                      disabled={file.status !== 'complete' || loading}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/3 p-8 flex flex-col items-center justify-center bg-gray-50 shadow-inner">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : previewUrl ? (
          previewType?.includes('image') ? (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-full rounded-lg shadow-md border border-gray-300"
              />
            </div>
          ) : previewType === 'application/pdf' ? (
            <div className="w-full h-full overflow-auto">
              <Document file={previewUrl}>
                <Page pageNumber={1} />
              </Document>
            </div>
          ) : (
            <div className="text-gray-500 text-lg">
              미리보기가 지원되지 않는 파일 형식입니다.
            </div>
          )
        ) : (
          <div className="text-gray-500 text-lg">미리보기를 선택하세요</div>
        )}
      </div>
    </div>
  );
};

export default LargeFileUpload;