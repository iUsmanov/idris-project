import { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Skeleton',
	component: Skeleton,
	tags: ['autodocs'],
	argTypes: {},
	args: { height: 100, width: 100 },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLightBeauty: Story = {
	args: {},
	decorators: [],
};

export const PrimaryDarkBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrangeBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};

export const CircleLightBeauty: Story = {
	args: {
		borderRadius: '50%',
	},
	decorators: [],
};

export const BigLightBeauty: Story = {
	args: {
		width: 500,
		height: 200,
	},
	decorators: [],
};
