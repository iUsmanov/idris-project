import { Comment } from '@/entities/Comment';
import { fetchArticleCommentsByArticleId } from '../services/fetchArticleCommentsByArticleId/fetchArticleCommentsByArticleId';
import { ArticleCommentsListSchema } from '../types/articleCommentsListSchema';
import { articleCommentsListReducer } from './articleCommentsListSlice';
import Image from '@/shared/assets/tests/storybook.jpg';
import { sendArticleComment } from '../services/sendArticleComment/sendArticleComment';

const comments: Comment[] = [
	{
		id: '1',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
	{
		id: '2',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
	{
		id: '3',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
];

describe('articleCommentsListSlice.test', () => {
	test('fetchArticleCommentsByArticleId pending', () => {
		const state: DeepPartial<ArticleCommentsListSchema> = {
			error: 'error',
			isLoading: false,
		};
		const expects = {
			error: undefined,
			isLoading: true,
		};
		expect(
			articleCommentsListReducer(
				state as ArticleCommentsListSchema,
				fetchArticleCommentsByArticleId.pending
			)
		).toEqual(expects);
	});
	test('fetchArticleCommentsByArticleId fulfilled', () => {
		const state: DeepPartial<ArticleCommentsListSchema> = {
			isLoading: true,
		};
		const payload: Comment[] = comments;
		const expects: DeepPartial<ArticleCommentsListSchema> = {
			isLoading: false,
			ids: ['1', '2', '3'],
			entities: {
				'1': comments[0],
				'2': comments[1],
				'3': comments[2],
			},
		};
		expect(
			articleCommentsListReducer(
				state as ArticleCommentsListSchema,
				fetchArticleCommentsByArticleId.fulfilled(payload, '', '')
			)
		).toEqual(expects);
	});
	test('fetchArticleCommentsByArticleId rejected', () => {
		const state: DeepPartial<ArticleCommentsListSchema> = {
			isLoading: true,
			error: undefined,
		};
		const expects: DeepPartial<ArticleCommentsListSchema> = {
			error: 'error',
			isLoading: false,
		};
		expect(
			articleCommentsListReducer(
				state as ArticleCommentsListSchema,
				fetchArticleCommentsByArticleId.rejected(null, '', '', 'error')
			)
		).toEqual(expects);
	});

	test('sendArticleComment rejected', () => {
		const state: DeepPartial<ArticleCommentsListSchema> = {
			error: undefined,
		};
		const expects: DeepPartial<ArticleCommentsListSchema> = {
			error: 'error',
		};
		expect(
			articleCommentsListReducer(
				state as ArticleCommentsListSchema,
				sendArticleComment.rejected(null, '', '', 'error')
			)
		).toEqual(expects);
	});
});
