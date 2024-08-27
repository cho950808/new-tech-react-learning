import { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional classes to style the accordion',
    },
    type: {
      control: {
        type: 'select',
        options: ['single', 'multiple'],
      },
      defaultValue: 'single',
      description: 'Determines the type of accordion (single or multiple open items)',
    },
    defaultValue: {
      control: 'text',
      description: 'The default value for the accordion (which item is open)',
    },
    collapsible: {
      control: 'boolean',
      defaultValue: false,
      description: 'Allows collapsing of the accordion if true',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
    defaultValue: 'item-1',
    className: '',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>
          This is the content of the first accordion item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>
          This is the content of the second accordion item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Item 3</AccordionTrigger>
        <AccordionContent>
          This is the content of the third accordion item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleItemsOpen: Story = {
  args: {
    type: 'multiple',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>
          This is the content of the first accordion item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>
          This is the content of the second accordion item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Item 3</AccordionTrigger>
        <AccordionContent>
          This is the content of the third accordion item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const CustomStyled: Story = {
  args: {
    type: 'single',
    collapsible: true,
    defaultValue: 'item-1',
    className: 'border-l-4 border-blue-500',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Custom Styled Item 1</AccordionTrigger>
        <AccordionContent>
          This accordion item has custom styling.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Custom Styled Item 2</AccordionTrigger>
        <AccordionContent>
          This is the content of the second accordion item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};