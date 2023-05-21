import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		children: 'Button',
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// PRIMARY

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

// OUTLINE

export const OutlineLight: Story = {
	args: {
		variant: 'outline',
	},
	decorators: [],
};

export const OutlineDark: Story = {
	args: {
		variant: 'outline',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const OutlineOrange: Story = {
	args: {
		variant: 'outline',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// CLEAR

export const ClearLight: Story = {
	args: {
		variant: 'clear',
	},
	decorators: [],
};

export const ClearDark: Story = {
	args: {
		variant: 'clear',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ClearOrange: Story = {
	args: {
		variant: 'clear',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
