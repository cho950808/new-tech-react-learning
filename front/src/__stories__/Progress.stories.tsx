import { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@/components/ui/progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    value: {
      control: { type: 'number' },
      defaultValue: 50,
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
    className: 'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
  },
};

export const HalfProgress: Story = {
  args: {
    value: 50,
  },
};

export const FullProgress: Story = {
  args: {
    value: 100,
  },
};

export const NoProgress: Story = {
  args: {
    value: 0,
  },
};

export const CustomStyled: Story = {
  args: {
    value: 75,
    className: 'bg-blue-500',
  },
};