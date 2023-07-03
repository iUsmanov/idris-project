import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Text',
	component: Text,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		title: 'Title',
		text: 'Your text',
	},
} satisfies Meta<typeof Text>;

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

// PRIMARY SIZE
export const PrimaryLightSizeM: Story = {
	args: {
		size: 'size_m',
	},
	decorators: [],
};

export const PrimaryDarkSizeL: Story = {
	args: {
		size: 'size_l',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrangeSizeS: Story = {
	args: {
		size: 'size_s',
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

// INVERTED SIZE

export const InvertedLightSizeM: Story = {
	args: {
		variant: 'inverted',
		size: 'size_m',
	},
	decorators: [],
};

export const InvertedDarkSizeL: Story = {
	args: {
		variant: 'inverted',
		size: 'size_l',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const InvertedOrangeSizeS: Story = {
	args: {
		variant: 'inverted',
		size: 'size_s',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// ERROR

export const ErrorLight: Story = {
	args: {
		variant: 'error',
		size: 'size_m',
	},
	decorators: [],
};

export const ErrorDark: Story = {
	args: {
		variant: 'error',
		size: 'size_l',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ErrorOrange: Story = {
	args: {
		variant: 'error',
		size: 'size_s',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
