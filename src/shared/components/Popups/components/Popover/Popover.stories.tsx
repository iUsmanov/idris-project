import { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Button } from '@/shared/components/Button/Button';

const meta = {
	title: 'shared/Popover',
	component: Popover,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		children: 'Text',
		trigger: <Button variant='outline'>Button</Button>,
	},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
	args: {},
	decorators: [],
};

export const PrimaryDark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrange: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
