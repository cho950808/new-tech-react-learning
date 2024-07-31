import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts, Post } from '../api/posts';
import PostItem from './PostItem';

const PostList: React.FC = () => {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;