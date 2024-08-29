import React, { FC, useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Board: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsSubmitDisabled(!e.target.value.trim() || !content.trim() || !date.trim());
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSubmitDisabled(!title.trim() || !e.target.value.trim() || !date.trim());
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setIsSubmitDisabled(!title.trim() || !content.trim() || !e.target.value.trim());
  };

  const handleSubmit = () => {
    if (title.trim() && content.trim() && date.trim()) {
      if (isEditing && editingPostId !== null) {
        setPosts(posts.map(post => 
          post.id === editingPostId 
            ? { ...post, title, content, date } 
            : post
        ));
        setIsEditing(false);
        setEditingPostId(null);
      } else {
        const newPost: Post = {
          id: posts.length + 1,
          title,
          content,
          date,
        };
        setPosts([newPost, ...posts]);
      }

      setTitle('');
      setContent('');
      setDate('');
      setIsDialogOpen(false);
      setIsSubmitDisabled(true);
    }
    setIsEditing(false);
  };

  const handleEditPost = (id: number) => {
    const postToEdit = posts.find(post => post.id === id);
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setDate(postToEdit.date);
      setEditingPostId(postToEdit.id);
      setIsEditing(true);
      setIsDialogOpen(true);
    }
  };

  const confirmDeletePost = (id: number) => {
    setIsConfirmDialogOpen(true);
    setPostIdToDelete(id);
  };

  const handleDeletePost = () => {
    if (postIdToDelete !== null) {
      setPosts(posts.filter((post) => post.id !== postIdToDelete));
      setIsConfirmDialogOpen(false);
      setPostIdToDelete(null);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg bg-white">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-indigo-500 text-white px-5 py-3 rounded-full shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition"
        >
          {isEditing ? '게시물 수정' : '새 게시물 작성'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider w-16">
                번호
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider w-48">
                제목
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider max-w-xs">
                내용
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider w-24">
                날짜
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider w-20">
                작업
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: postsPerPage }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="py-4 px-6 bg-white border-b">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-4 px-6 bg-white border-b">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-4 px-6 bg-white border-b">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-4 px-6 bg-white border-b">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-4 px-6 bg-white border-b">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))
            ) : currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <tr key={post.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleEditPost(post.id)}>
                  <td className="py-4 px-6 bg-white border-b">{post.id}</td>
                  <td className="py-4 px-6 bg-white border-b truncate" title={post.title}>{post.title}</td>
                  <td className="py-4 px-6 bg-white border-b truncate max-w-xs" title={post.content}>
                    {post.content}
                  </td>
                  <td className="py-4 px-6 bg-white border-b">{post.date}</td>
                  <td className="py-4 px-6 bg-white border-b">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDeletePost(post.id);
                      }}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  게시물이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="inline-flex items-center -space-x-px">
            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`py-2 px-3 leading-tight border bg-white hover:bg-indigo-100 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 ${
                    currentPage === index + 1 ? 'text-indigo-600 border-indigo-500 bg-indigo-50' : 'text-gray-500 border-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 삭제 확인 모달 */}
      {isConfirmDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-10 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full z-20">
            <p className="text-center text-lg mb-6">정말로 삭제하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button
                              onClick={() => setIsConfirmDialogOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              취소
            </button>
            <button
              onClick={handleDeletePost}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    )}

      {/* 게시물 작성/수정 모달 */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-10 flex justify-center items-center">
          <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full z-20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{isEditing ? '게시물 수정하기' : '새 게시물 작성하기'}</h2>
              <button
                onClick={() => {
                  setIsDialogOpen(false);
                  setIsEditing(false);
                  setEditingPostId(null);
                  setTitle('');
                  setContent('');
                  setDate('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력하세요"
            />
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              rows={6}
              value={content}
              onChange={handleContentChange}
              placeholder="게시글 내용을 입력하세요"
            />
            <input
              type="date"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
              value={date}
              onChange={handleDateChange}
            />

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className={`px-5 py-2 rounded-lg text-white transition-all duration-300 ${
                  isSubmitDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                }`}
                disabled={isSubmitDisabled}
              >
                {isEditing ? '수정하기' : '게시하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;