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

export const CenterLight: Story = {
	args: {},
	decorators: [],
};

export const CenterDark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const CenterOrange: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};

export const LeftLight: Story = {
	args: { justify: 'left' },
	decorators: [],
};

export const BiggerLight: Story = {
	args: {
		justify: 'right',
		size: 200,
	},
	decorators: [],
};

export const NoLight: Story = {
	args: {
		src: '',
		alt: 'Нет пути к изображению',
	},
	decorators: [],
};
