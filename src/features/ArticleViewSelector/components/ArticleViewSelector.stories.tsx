import { Meta, StoryObj } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'features/ArticleViewSelector',
	component: ArticleViewSelector,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof ArticleViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TileLight: Story = {
	args: {
		view: 'TILE',
	},
	decorators: [],
};

export const TileDark: Story = {
	args: {
		view: 'TILE',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const TileOrange: Story = {
	args: {
		view: 'TILE',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};

export const ListLight: Story = {
	args: {
		view: 'LIST',
	},
	decorators: [],
};

export const ListDark: Story = {
	args: {
		view: 'LIST',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ListOrange: Story = {
	args: {
		view: 'LIST',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
