import { Meta, StoryObj } from '@storybook/react';
import { StarRating } from './StarRating';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/StarRating',
	component: StarRating,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalLightBeauty: Story = {
	args: {},
	decorators: [],
};

export const NormalDarkBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const NormalOrangeBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
