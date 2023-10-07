import { Meta, StoryObj } from '@storybook/react';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/ArticleListItemSkeleton',
	component: ArticleListItemSkeleton,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		view: 'LIST',
	},
} satisfies Meta<typeof ArticleListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLightMatrix: Story = {
	args: {},
	decorators: [],
};

export const PrimaryDarkMatrix: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrangeMatrix: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
