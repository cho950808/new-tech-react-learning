import React, { useState } from 'react';
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { addPost, Post } from '../api/posts';

const AddPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const mutation: UseMutationResult<Post, Error, Omit<Post, 'id'>> = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mt-8 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">게시글 등록</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="타이틀"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md text-lg"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md text-lg resize-vertical"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">추가</button>
    </form>
  );
};

export default AddPost;