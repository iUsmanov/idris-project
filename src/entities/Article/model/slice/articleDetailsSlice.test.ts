import { mockArticle } from '../../mocks';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { articleDetailsReducer } from './articleDetailsSlice';

describe('articleDetailsSlice.test', () => {
	test('fetchArticleById pending', () => {
		const state: DeepPartial<ArticleDetailsSchema> = {
			isLoading: false,
		};
		const expected = {
			data: undefined,
			error: undefined,
			isLoading: true,
		};
		expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.pending)).toEqual(
			expected
		);
	});
	test('fetchArticleById fulfilled', () => {
		const state: DeepPartial<ArticleDetailsSchema> = {
			isLoading: true,
		};
		const payload: Article = mockArticle;
		const expected = {
			data: payload,
			isLoading: false,
		};
		expect(
			articleDetailsReducer(
				state as ArticleDetailsSchema,
				fetchArticleById.fulfilled(payload, '', '')
			)
		).toEqual(expected);
	});
	test('fetchArticleById rejected', () => {
		const state: DeepPartial<ArticleDetailsSchema> = {
			isLoading: true,
		};
		const expected = {
			error: 'error',
			isLoading: false,
		};
		expect(
			articleDetailsReducer(
				state as ArticleDetailsSchema,
				fetchArticleById.rejected(null, '', '', 'error')
			)
		).toEqual(expected);
	});
});
