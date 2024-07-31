import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddPost from '../components/AddPost';

const queryClient = new QueryClient();

test('adds a new post', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <AddPost />
    </QueryClientProvider>
  );

  fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'New Post' } });
  fireEvent.change(screen.getByPlaceholderText(/Content/i), { target: { value: 'New Content' } });
  fireEvent.click(screen.getByText(/Add Post/i));

  expect(screen.getByPlaceholderText(/Title/i)).toHaveValue('');
  expect(screen.getByPlaceholderText(/Content/i)).toHaveValue('');
});