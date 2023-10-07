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

export const PrimaryLightMatrix: Story = {
	args: {
		variant: 'primary',
	},
	decorators: [],
};

export const PrimaryDarkMatrix: Story = {
	args: {
		variant: 'primary',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrangeMatrix: Story = {
	args: {
		variant: 'primary',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// INVERTED

export const InvertedLightMatrix: Story = {
	args: {
		variant: 'inverted',
	},
	decorators: [],
};

export const InvertedDarkMatrix: Story = {
	args: {
		variant: 'inverted',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const InvertedOrangeMatrix: Story = {
	args: {
		variant: 'inverted',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
