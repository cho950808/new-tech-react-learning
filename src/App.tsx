import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './components/Header';
import PostList from './components/PostList';
import AddPost from './components/AddPost';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto p-4 flex flex-col items-center">
            <AddPost />
            <PostList />
          </main>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </QueryClientProvider>
  );
};

export default App;