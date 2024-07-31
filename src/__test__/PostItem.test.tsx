import React from 'react';
import { render, screen } from '@testing-library/react';
import PostItem from '../components/PostItem';
import { Post } from '../api/posts';

const post: Post = { id: 1, title: 'Test Title', content: 'Test Content' };

test('renders post item', () => {
  render(<PostItem post={post} />);
  expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
});