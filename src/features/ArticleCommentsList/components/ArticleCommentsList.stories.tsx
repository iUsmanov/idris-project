import { Meta, StoryObj } from '@storybook/react';
import { ArticleCommentsList } from './ArticleCommentsList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Comment } from '@/entities/Comment';
import Image from '@/shared/assets/tests/storybook.jpg';
import { Dictionary } from '@reduxjs/toolkit';

const entities: Dictionary<Comment> = {
	'1': {
		id: '1',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
	'2': {
		id: '2',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
	'3': {
		id: '3',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
};

const meta = {
	title: 'features/ArticleCommentsList',
	component: ArticleCommentsList,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	parameters: {
		router: {
			path: '/articles/:id',
			route: '/articles/1',
		},
	},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				entities: entities,
			},
		}),
	],
} satisfies Meta<typeof ArticleCommentsList>;

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

export const LoadingLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				isLoading: true,
			},
		}),
	],
};

export const ErrorLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				error: 'error',
			},
		}),
	],
};
