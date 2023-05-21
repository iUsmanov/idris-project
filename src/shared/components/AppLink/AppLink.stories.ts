import type { Meta, StoryObj } from '@storybook/react';

import { AppLink } from './AppLink';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/AppLink',
	component: AppLink,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		to: '',
		children: 'AppLink',
	},
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
	args: {
		variant: 'primary',
	},
	decorators: [],
};

export const PrimaryDark: Story = {
	args: {
		variant: 'primary',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrange: Story = {
	args: {
		variant: 'primary',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// INVERTED

export const InvertedLight: Story = {
	args: {
		variant: 'inverted',
	},
	decorators: [],
};

export const InvertedDark: Story = {
	args: {
		variant: 'inverted',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const InvertedOrange: Story = {
	args: {
		variant: 'inverted',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
