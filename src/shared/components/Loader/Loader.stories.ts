import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Loader',
	component: Loader,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaxLight: Story = {
	args: {
		size: 'max',
	},
	decorators: [],
};

export const MaxDark: Story = {
	args: {
		size: 'max',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const MaxOrange: Story = {
	args: {
		size: 'max',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// MIN

export const MinLight: Story = {
	args: {
		size: 'min',
	},
	decorators: [],
};

export const MinDark: Story = {
	args: {
		size: 'min',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const MinOrange: Story = {
	args: {
		size: 'min',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
