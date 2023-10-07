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

// PRIMARY SIZE
export const PrimaryLightSizeMMatrix: Story = {
	args: {
		size: 'size_m',
	},
	decorators: [],
};

export const PrimaryDarkSizeLMatrix: Story = {
	args: {
		size: 'size_l',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrangeSizeSMatrix: Story = {
	args: {
		size: 'size_s',
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

// INVERTED SIZE

export const InvertedLightSizeMMatrix: Story = {
	args: {
		variant: 'inverted',
		size: 'size_m',
	},
	decorators: [],
};

export const InvertedDarkSizeLMatrix: Story = {
	args: {
		variant: 'inverted',
		size: 'size_l',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const InvertedOrangeSizeSMatrix: Story = {
	args: {
		variant: 'inverted',
		size: 'size_s',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// ERROR

export const ErrorLightMatrix: Story = {
	args: {
		variant: 'error',
		size: 'size_m',
	},
	decorators: [],
};

export const ErrorDarkMatrix: Story = {
	args: {
		variant: 'error',
		size: 'size_l',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ErrorOrangeMatrix: Story = {
	args: {
		variant: 'error',
		size: 'size_s',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
