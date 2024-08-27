import { Meta, StoryObj } from '@storybook/react';
import { Modal } from '@/components/ui/modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    title: {
      control: { type: 'text' },
      defaultValue: 'Modal Title',
      description: 'Title of the modal',
    },
    description: {
      control: { type: 'text' },
      defaultValue: 'This is the modal description.',
      description: 'Description of the modal',
    },
    isOpen: {
      control: { type: 'boolean' },
      defaultValue: true,
      description: 'Controls whether the modal is open or closed',
    },
    onClose: { action: 'closed', description: 'Function to close the modal' },
    children: {
      control: { type: 'text' },
      defaultValue: 'This is the modal content.',
      description: 'Content to be rendered inside the modal',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional classes to style the modal',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: 'Default Modal',
    description: 'This is the default modal description.',
    isOpen: true,
    children: 'This is the default modal content.',
  },
};

export const WithCustomContent: Story = {
  args: {
    title: 'Custom Modal',
    description: 'This modal contains custom content.',
    isOpen: true,
    children: (
      <div>
        <p>Here is some custom content for the modal.</p>
        <button className="btn btn-primary">Click Me</button>
      </div>
    ),
  },
};

export const CustomStyled: Story = {
  args: {
    title: 'Styled Modal',
    description: 'This modal has custom styling.',
    isOpen: true,
    className: 'bg-blue-500 text-white',
    children: 'This modal has custom background and text colors.',
  },
};