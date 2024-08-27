import { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'

const meta: Meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    sideOffset: {
      control: { type: 'number' },
      defaultValue: 4,
      description: 'Offset of the tooltip from the trigger element',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional classes to style the tooltip content',
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <button className="btn">Hover me</button>
      </TooltipTrigger>
      <TooltipContent>
        This is a tooltip!
      </TooltipContent>
    </Tooltip>
  ),
};

export const CustomStyled: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <button className="btn">Hover me</button>
      </TooltipTrigger>
      <TooltipContent className="bg-red-500 text-white">
        Custom styled tooltip!
      </TooltipContent>
    </Tooltip>
  ),
};