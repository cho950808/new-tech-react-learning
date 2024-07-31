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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;