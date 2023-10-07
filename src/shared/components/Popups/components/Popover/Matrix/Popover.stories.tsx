import { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Button } from '@/shared/components/Button';

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

export const PrimaryLightMatrix: Story = {
	args: {},
	decorators: [],
};

export const PrimaryDarkMatrix: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrangeMatrix: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
