import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddPost from '../components/AddPost';

const queryClient = new QueryClient();

const meta: Meta<typeof AddPost> = {
  title: 'Components/AddPost',
  component: AddPost,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AddPost>;

export const Default: Story = {};