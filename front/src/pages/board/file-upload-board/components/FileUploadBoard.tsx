import React, { FC, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface Post {
  content: string;
  files: File[];
  fileURLs: string[];
}

const FileUploadBoard: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileURLs, setFileURLs] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      const newFileURLs = newFiles.map((file) => URL.createObjectURL(file));
      setFileURLs((prevURLs) => [...prevURLs, ...newFileURLs]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFileURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (content.trim()) {
      const newPost: Post = { content, files, fileURLs };
      setPosts((prevPosts) => [newPost, ...prevPosts]);

      setContent('');
      setFiles([]);
      setFileURLs([]);
      setIsDialogOpen(false);
      setIsSubmitDisabled(true);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSubmitDisabled(!e.target.value.trim());
  };

  return (
    <div className="w-full mx-auto p-6 shadow-lg rounded-lg bg-white">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-indigo-500 text-white px-5 py-3 rounded-full shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition"
        >
          새 게시물 작성
        </button>
      </div>

      {/* 게시된 게시물 리스트 (테이블 형식) */}
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left p-4">번호</th>
            <th className="text-left p-4">내용</th>
            <th className="text-left p-4">파일 목록</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{post.content}</td>
                <td className="p-4">
                  <ul className="space-y-2">
                    {post.fileURLs.map((url, i) => (
                      <li key={i}>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          {post.files[i].name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                게시물이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 모달 창 */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 z-10" />
          
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl shadow-xl max-w-md w-full z-20">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                게시물 작성하기
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>

            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
              rows={6}
              value={content}
              onChange={handleContentChange}
              placeholder="게시글 내용을 입력하세요"
            />

            <div className="mb-6">
              <div className="mb-4 text-sm text-gray-600">파일 선택:</div>
              <div className="relative flex items-center justify-center border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <p className="text-gray-400">클릭하거나 파일을 드래그하세요</p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-6">
                <h3 className="text-lg font-semibold mb-4">파일 목록</h3>
                <ul className="space-y-3">
                  {fileURLs.map((url, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline truncate max-w-xs">
                        {files[index].name}
                      </a>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none ml-4"
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className={`px-5 py-2 rounded-lg text-white transition-all duration-300 ${isSubmitDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'}`}
                disabled={isSubmitDisabled}
              >
                게시하기
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default FileUploadBoard;