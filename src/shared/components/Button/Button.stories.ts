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

export const ClearLightSizeM: Story = {
	args: {
		variant: 'clear',
		size: 'size_m',
	},
	decorators: [],
};

export const ClearDarkSizeL: Story = {
	args: {
		variant: 'clear',
		size: 'size_l',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ClearOrangeSizeXL: Story = {
	args: {
		variant: 'clear',
		size: 'size_xl',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// CLEAR_INVERTED

export const ClearinvertedLightSizeM: Story = {
	args: {
		variant: 'clearInverted',
		size: 'size_m',
	},
	decorators: [],
};

export const ClearinvertedDarkSizeL: Story = {
	args: {
		variant: 'clearInverted',
		size: 'size_l',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ClearinvertedOrangeSizeXL: Story = {
	args: {
		variant: 'clearInverted',
		size: 'size_xl',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// BACKGROUND

export const BackgroundLight: Story = {
	args: {
		variant: 'background',
		square: true,
		size: 'size_m',
		children: '>',
	},
	decorators: [],
};

export const BackgroundDark: Story = {
	args: {
		variant: 'background',
		square: true,
		size: 'size_l',
		children: '>',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const BackgroundOrange: Story = {
	args: {
		variant: 'background',
		square: true,
		size: 'size_xl',
		children: '>',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// BACKGROUND_INVERTED

export const BackgroundinvertedLight: Story = {
	args: {
		variant: 'backgroundInverted',
		square: true,
		size: 'size_m',
		children: '>',
	},
	decorators: [],
};

export const BackgroundinvertedDark: Story = {
	args: {
		variant: 'backgroundInverted',
		square: true,
		size: 'size_l',
		children: '>',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const BackgroundinvertedOrange: Story = {
	args: {
		variant: 'backgroundInverted',
		square: true,
		size: 'size_xl',
		children: '>',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
