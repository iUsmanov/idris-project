import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticleCommentsListError, getArticleCommentsListIsLoading } from './getArticleCommentsList';

describe('getArticleCommentsListIsLoading', () => {
	test('Should return true', () => {
		const state: DeepPartial<StateSchema> = { articleCommentsList: { isLoading: true } };
		expect(getArticleCommentsListIsLoading(state as StateSchema)).toEqual(true);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticleCommentsListIsLoading(state as StateSchema)).toEqual(false);
	});
});
describe('getArticleCommentsListError', () => {
	test('Should return true error', () => {
		const state: DeepPartial<StateSchema> = { articleCommentsList: { error: 'error' } };
		expect(getArticleCommentsListError(state as StateSchema)).toEqual('error');
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticleCommentsListError(state as StateSchema)).toEqual(undefined);
	});
});
