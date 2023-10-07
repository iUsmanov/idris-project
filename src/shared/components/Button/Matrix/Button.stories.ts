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

// OUTLINE

export const OutlineLightMatrix: Story = {
	args: {
		variant: 'outline',
	},
	decorators: [],
};

export const OutlineDarkMatrix: Story = {
	args: {
		variant: 'outline',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const OutlineOrangeMatrix: Story = {
	args: {
		variant: 'outline',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// OUTLINE

export const OutlineRedLightMatrix: Story = {
	args: {
		variant: 'outlineRed',
	},
	decorators: [],
};

export const OutlineRedDarkMatrix: Story = {
	args: {
		variant: 'outlineRed',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const OutlineRedOrangeMatrix: Story = {
	args: {
		variant: 'outlineRed',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// CLEAR

export const ClearLightSizeMMatrix: Story = {
	args: {
		variant: 'clear',
		size: 'size_m',
	},
	decorators: [],
};

export const ClearDarkSizeLMatrix: Story = {
	args: {
		variant: 'clear',
		size: 'size_l',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ClearOrangeSizeXLMatrix: Story = {
	args: {
		variant: 'clear',
		size: 'size_xl',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// CLEAR_INVERTED

export const ClearinvertedLightSizeMMatrix: Story = {
	args: {
		variant: 'clearInverted',
		size: 'size_m',
	},
	decorators: [],
};

export const ClearinvertedDarkSizeLMatrix: Story = {
	args: {
		variant: 'clearInverted',
		size: 'size_l',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ClearinvertedOrangeSizeXLMatrix: Story = {
	args: {
		variant: 'clearInverted',
		size: 'size_xl',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// BACKGROUND

export const BackgroundLightMatrix: Story = {
	args: {
		variant: 'background',
		square: true,
		size: 'size_m',
		children: '>',
	},
	decorators: [],
};

export const BackgroundDarkMatrix: Story = {
	args: {
		variant: 'background',
		square: true,
		size: 'size_l',
		children: '>',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const BackgroundOrangeMatrix: Story = {
	args: {
		variant: 'background',
		square: true,
		size: 'size_xl',
		children: '>',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// BACKGROUND_INVERTED

export const BackgroundinvertedLightMatrix: Story = {
	args: {
		variant: 'backgroundInverted',
		square: true,
		size: 'size_m',
		children: '>',
	},
	decorators: [],
};

export const BackgroundinvertedDarkMatrix: Story = {
	args: {
		variant: 'backgroundInverted',
		square: true,
		size: 'size_l',
		children: '>',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const BackgroundinvertedOrangeMatrix: Story = {
	args: {
		variant: 'backgroundInverted',
		square: true,
		size: 'size_xl',
		children: '>',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// DISABLED

export const DisabledLightMatrix: Story = {
	args: {
		size: 'size_m',
		disabled: true,
		variant: 'outline',
	},
	decorators: [],
};

export const DisabledDarkMatrix: Story = {
	args: {
		size: 'size_l',
		disabled: true,
		variant: 'outline',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const DisabledOrangeMatrix: Story = {
	args: {
		size: 'size_xl',
		disabled: true,
		variant: 'outline',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
