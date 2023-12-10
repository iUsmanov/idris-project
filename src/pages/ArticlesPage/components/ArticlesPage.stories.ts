import type { Meta, StoryObj } from '@storybook/react';
import { ArticlesPage } from './ArticlesPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockArticlesEntities } from '@/entities/Article/testing';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

const meta = {
	title: 'pages/ArticlesPage',
	component: ArticlesPage,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	decorators: [
		StoreDecorator({
			articlesInfiniteList: {
				ids: mockArticlesEntities.ids,
				entities: mockArticlesEntities.entities,
			},
		}),
	],
} satisfies Meta<typeof ArticlesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	args: {},
	decorators: [],
};

export const Dark: Story = {
	args: {},
	decorators: [
		ThemeDecorator('app-dark-theme'),
		StoreDecorator({
			articlesInfiniteList: {
				ids: mockArticlesEntities.ids,
				entities: mockArticlesEntities.entities,
			},
		}),
	],
};

export const Orange: Story = {
	args: {},
	decorators: [
		ThemeDecorator('app-orange-theme'),
		StoreDecorator({
			articlesInfiniteList: {
				ids: mockArticlesEntities.ids,
				entities: mockArticlesEntities.entities,
			},
		}),
	],
};

export const ErrorLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articlesInfiniteList: {
				ids: mockArticlesEntities.ids,
				entities: mockArticlesEntities.entities,
				error: 'error',
			},
		}),
	],
};

export const LoadingLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articlesInfiniteList: {
				ids: mockArticlesEntities.ids,
				entities: mockArticlesEntities.entities,
				isLoading: true,
			},
		}),
	],
};

export const ListLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articlesInfiniteList: {
				ids: mockArticlesEntities.ids,
				entities: mockArticlesEntities.entities,
				view: 'LIST',
			},
		}),
	],
};

export const TileLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articlesInfiniteList: {
				ids: mockArticlesEntities.ids,
				entities: mockArticlesEntities.entities,
				view: 'TILE',
			},
		}),
	],
};
