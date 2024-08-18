import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from '../components/PostList';

const queryClient = new QueryClient();

test('renders post list', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <PostList />
    </QueryClientProvider>
  );

  await screen.findByText(/First Post/i);
  expect(screen.getByText(/Second Post/i)).toBeInTheDocument();
});