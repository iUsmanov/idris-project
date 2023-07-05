import { Meta, StoryObj } from '@storybook/react';
import { Shimmer, ShimmerType } from './Shimmer';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const shimmer: ShimmerType = {
	ver: [
		{ width: 100, height: 100 },
		{ width: 100, height: 100 },
		{ width: 100, height: 100 },
		{
			hor: [
				{ width: 100, height: 100 },
				{ width: 100, height: 100 },
				{ width: 100, height: 100 },
				{
					ver: [
						{ width: 100, height: 100 },
						{ width: 100, height: 100 },
						{ width: 100, height: 100 },
						{ width: 100, height: 100, borderRadius: '50%' },
					],
				},
				{ width: 100, height: 100 },
				{
					ver: [
						{ width: 100, height: 100 },
						{ width: 100, height: 100 },
						{ width: 100, height: 100 },
						{ width: 100, height: 100, borderRadius: '50%' },
						{
							hor: [
								{ width: 100, height: 100 },
								{ width: 100, height: 100 },
							],
						},
					],
				},
			],
		},
	],
};

const meta = {
	title: 'shared/Shimmer',
	component: Shimmer,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		skeletons: shimmer,
	},
} satisfies Meta<typeof Shimmer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
	args: {},
	decorators: [],
};

export const PrimaryDark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrange: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
