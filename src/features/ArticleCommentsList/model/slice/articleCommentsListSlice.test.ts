import { Comment, mockComments } from '@/entities/Comment/testing';
import { fetchArticleCommentsByArticleId } from '../services/fetchArticleCommentsByArticleId/fetchArticleCommentsByArticleId';
import { ArticleCommentsListSchema } from '../types/articleCommentsListSchema';
import { articleCommentsListReducer } from './articleCommentsListSlice';
import { sendArticleComment } from '../services/sendArticleComment/sendArticleComment';

describe('articleCommentsListSlice.test', () => {
	test('fetchArticleCommentsByArticleId pending', () => {
		const state: DeepPartial<ArticleCommentsListSchema> = {
			commentsError: 'error',
			isCommentsLoading: false,
		};
		const expects = {
			commentsError: undefined,
			isCommentsLoading: true,
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
			isCommentsLoading: true,
		};
		const payload: Comment[] = mockComments;
		const expects: DeepPartial<ArticleCommentsListSchema> = {
			isCommentsLoading: false,
			ids: ['1', '2', '3'],
			entities: {
				'1': mockComments[0],
				'2': mockComments[1],
				'3': mockComments[2],
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
			isCommentsLoading: true,
			commentsError: undefined,
		};
		const expects: DeepPartial<ArticleCommentsListSchema> = {
			commentsError: 'error',
			isCommentsLoading: false,
		};
		expect(
			articleCommentsListReducer(
				state as ArticleCommentsListSchema,
				fetchArticleCommentsByArticleId.rejected(null, '', '', 'error')
			)
		).toEqual(expects);
	});
});

describe('articleCommentsListSlice.test', () => {
	test('sendArticleComment pending', () => {
		const state: DeepPartial<ArticleCommentsListSchema> = {
			sendError: 'error',
			isSendLoading: false,
		};
		const expects = {
			sendError: undefined,
			isSendLoading: true,
		};
		expect(
			articleCommentsListReducer(state as ArticleCommentsListSchema, sendArticleComment.pending)
		).toEqual(expects);
	});
	test('sendArticleComment fulfilled', () => {
		const state: DeepPartial<ArticleCommentsListSchema> = {
			isSendLoading: true,
		};
		const expects: DeepPartial<ArticleCommentsListSchema> = {
			isSendLoading: false,
		};
		expect(
			articleCommentsListReducer(state as ArticleCommentsListSchema, sendArticleComment.fulfilled)
		).toEqual(expects);
	});

	test('sendArticleComment rejected', () => {
		const state: DeepPartial<ArticleCommentsListSchema> = {
			isSendLoading: true,
			sendError: undefined,
		};
		const expects: DeepPartial<ArticleCommentsListSchema> = {
			isSendLoading: false,
			sendError: 'error',
		};
		expect(
			articleCommentsListReducer(
				state as ArticleCommentsListSchema,
				sendArticleComment.rejected(null, '', { articleId: '1', text: '' }, 'error')
			)
		).toEqual(expects);
	});
});
