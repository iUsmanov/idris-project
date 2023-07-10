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
				ids: ['1', '2', '3'],
				entities: entities,
				commentsError: undefined,
				sendError: undefined,
				isCommentsLoading: false,
				isSendLoading: false,
			},
			articleDetails: {
				error: undefined,
			},
			addNewComment: {
				text: 'Some text',
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

export const CommentsLoadingLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				ids: ['1', '2', '3'],
				entities: {},
				commentsError: undefined,
				sendError: undefined,
				isCommentsLoading: true,
				isSendLoading: false,
			},
			articleDetails: {
				error: undefined,
			},
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
};

export const SendLoadingLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				ids: ['1', '2', '3'],
				entities: entities,
				commentsError: undefined,
				sendError: undefined,
				isCommentsLoading: false,
				isSendLoading: true,
			},
			articleDetails: {
				error: undefined,
			},
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
};

export const CommenstErrorLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				ids: ['1', '2', '3'],
				entities: entities,
				commentsError: 'error',
				sendError: undefined,
				isCommentsLoading: false,
				isSendLoading: false,
			},
			articleDetails: {
				error: undefined,
			},
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
};

export const SendErrorLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				ids: ['1', '2', '3'],
				entities: entities,
				commentsError: undefined,
				sendError: 'error',
				isCommentsLoading: false,
				isSendLoading: false,
			},
			articleDetails: {
				error: undefined,
			},
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
};
