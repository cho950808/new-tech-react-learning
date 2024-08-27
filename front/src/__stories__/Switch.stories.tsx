import { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@/components/ui/switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional classes to style the switch',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Determines if the switch is checked by default',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch if true',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomStyled: Story = {
  args: {
    className: 'bg-red-500',
  },
  render: (args) => <Switch {...args} />,
};