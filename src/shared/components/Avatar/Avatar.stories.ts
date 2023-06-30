import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import Image from '@/shared/assets/tests/storybook.jpg';

const meta = {
	title: 'shared/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		src: Image,
	},
} satisfies Meta<typeof Avatar>;

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
