import { Meta, StoryObj } from '@storybook/react';
import { ArticleList } from './ArticleList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockArticles } from '../../mocks';

const meta = {
	title: 'entities/ArticleList',
	component: ArticleList,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		articles: mockArticles,
	},
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListLight: Story = {
	args: {
		view: 'LIST',
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

export const LoadingTileDark: Story = {
	args: {
		view: 'TILE',
		isLoading: true,
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const LoadingListDark: Story = {
	args: {
		view: 'LIST',
		isLoading: true,
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};
