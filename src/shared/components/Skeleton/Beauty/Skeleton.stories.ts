import { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Skeleton',
	component: Skeleton,
	tags: ['autodocs'],
	argTypes: {},
	args: { height: 100, width: 100 },
} satisfies Meta<typeof Skeleton>;

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

export const CircleLight: Story = {
	args: {
		borderRadius: '50%',
	},
	decorators: [],
};

export const BigLight: Story = {
	args: {
		width: 500,
		height: 200,
	},
	decorators: [],
};
