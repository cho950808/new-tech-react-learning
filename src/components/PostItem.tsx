import React from 'react';
import { Post } from '../api/posts';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
};

export default PostItem;