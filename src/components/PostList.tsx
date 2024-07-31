import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts, Post } from '../api/posts';


const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
    </div>
  );
};

const PostList: React.FC = () => {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const renderTableHeader = () => (
    <thead>
      <tr>
        <th className="py-2 px-4 border-b">ID</th>
        <th className="py-2 px-4 border-b">타이틀</th>
        <th className="py-2 px-4 border-b">내용</th>
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody>
      {data?.map((post) => (
        <tr key={post.id}>
          <td className="py-2 px-4 border-b text-center">{post.id}</td>
          <td className="py-2 px-4 border-b">{post.title}</td>
          <td className="py-2 px-4 border-b">{post.content}</td>
        </tr>
      ))}
    </tbody>
  );

  const renderLoadingSkeleton = () => (
    <tbody>
      {[1, 2, 3].map((_, idx) => (
        <tr key={idx}>
          <td className="py-2 px-4 border-b text-center"><Skeleton /></td>
          <td className="py-2 px-4 border-b"><Skeleton /></td>
          <td className="py-2 px-4 border-b"><Skeleton /></td>
        </tr>
      ))}
    </tbody>
  );

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">게시글 목록</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            {renderTableHeader()}
            {renderLoadingSkeleton()}
          </table>
        </div>
      </div>
    );
  }

  if (error instanceof Error) {
    return <div className="text-center text-lg text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">게시글 목록</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          {renderTableHeader()}
          {renderTableBody()}
        </table>
      </div>
    </div>
  );
};

export default PostList;