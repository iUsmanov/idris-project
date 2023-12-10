import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDetailsPage } from './ArticleDetailsPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockArticle } from '@/entities/Article/testing';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { mockCommentsEntities } from '@/features/ArticleCommentsList/testing';
import { mockStorybookGetArticleRecommendationsSuccess } from '@/shared/mocks/storybook/requests';

const meta = {
	title: 'pages/ArticleDetailsPage',
	component: ArticleDetailsPage,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	decorators: [
		StoreDecorator({
			articleDetails: { data: mockArticle, error: undefined },
			articleCommentsList: {
				ids: mockCommentsEntities.ids,
				entities: mockCommentsEntities.entities,
				commentsError: undefined,
				sendError: undefined,
				isCommentsLoading: false,
				isSendLoading: false,
			},
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
	parameters: {
		mockData: [mockStorybookGetArticleRecommendationsSuccess],
		router: {
			path: '/articles/:id',
			route: '/articles/1',
		},
	},
} satisfies Meta<typeof ArticleDetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	args: {},
	decorators: [],
};

export const Dark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const Orange: Story = {
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
			articleDetails: { data: mockArticle, error: undefined },
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
				ids: mockCommentsEntities.ids,
				entities: mockCommentsEntities.entities,
				commentsError: undefined,
				sendError: undefined,
				isCommentsLoading: false,
				isSendLoading: true,
			},
			articleDetails: { data: mockArticle, error: undefined },
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
				ids: mockCommentsEntities.ids,
				entities: mockCommentsEntities.entities,
				commentsError: 'error',
				sendError: undefined,
				isCommentsLoading: false,
				isSendLoading: false,
			},
			articleDetails: { data: mockArticle, error: undefined },
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
				ids: mockCommentsEntities.ids,
				entities: mockCommentsEntities.entities,
				commentsError: undefined,
				sendError: 'error',
				isCommentsLoading: false,
				isSendLoading: false,
			},
			articleDetails: { data: mockArticle, error: undefined },
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
};
