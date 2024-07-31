import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from '../components/PostList';

const queryClient = new QueryClient();

const meta: Meta<typeof PostList> = {
  title: 'Components/PostList',
  component: PostList,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PostList>;

export const Default: Story = {};