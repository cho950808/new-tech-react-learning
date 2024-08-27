import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../components/ui/card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  subcomponents: { CardHeader, CardFooter, CardTitle, CardDescription, CardContent },
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a description for the card.</CardDescription>
        </CardHeader>
        <CardContent>
          This is the content of the card. You can place any kind of information here.
        </CardContent>
        <CardFooter>
          <button className="btn btn-primary">Action</button>
        </CardFooter>
      </>
    ),
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'bg-blue-500 text-white',
    children: (
      <>
        <CardHeader>
          <CardTitle>Custom Styled Card</CardTitle>
          <CardDescription>Styled using custom class names.</CardDescription>
        </CardHeader>
        <CardContent>
          This card has custom background and text colors applied through the `className` prop.
        </CardContent>
        <CardFooter>
          <button className="btn btn-secondary">Action</button>
        </CardFooter>
      </>
    ),
  },
};