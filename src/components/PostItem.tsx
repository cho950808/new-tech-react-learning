import React from 'react';
import { Post } from '../api/posts';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
      <p className="text-lg text-gray-600">{post.content}</p>
    </div>
  );
};

export default PostItem;