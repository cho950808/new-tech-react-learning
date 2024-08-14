import type { Meta, StoryObj } from '@storybook/react';
import PostItem from '../components/PostItem';

const meta: Meta<typeof PostItem> = {
  title: 'Components/PostItem',
  component: PostItem,
};

export default meta;

type Story = StoryObj<typeof PostItem>;

export const Default: Story = {
  args: {
    post: { id: 1, title: 'Sample Post', content: 'This is a sample post content' },
  },
};