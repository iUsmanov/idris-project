import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleCommentsByArticleId } from './fetchArticleCommentsByArticleId';
import { mockComments } from '@/entities/Comment/testing';

describe('fetchArticleCommentsByArticleId.test', () => {
	test('Success load', async () => {
		const thunk = new TestAsyncThunk(fetchArticleCommentsByArticleId);
		thunk.api.get.mockResolvedValue({ data: mockComments });
		const action = await thunk.callThunk('1');

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.get).toHaveBeenCalled();
		expect(action.payload).toEqual(mockComments);
		expect(action.meta.requestStatus).toBe('fulfilled');
	});
	test('Error load', async () => {
		const thunk = new TestAsyncThunk(fetchArticleCommentsByArticleId);
		thunk.api.get.mockResolvedValue({ status: 403 });
		const action = await thunk.callThunk('1');

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.get).toHaveBeenCalled();
		expect(action.payload).toEqual('error');
		expect(action.meta.requestStatus).toBe('rejected');
	});
	test('With undefined articleId', async () => {
		const thunk = new TestAsyncThunk(fetchArticleCommentsByArticleId);
		const action = await thunk.callThunk('');

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(action.payload).toEqual('error');
		expect(action.meta.requestStatus).toBe('rejected');
	});
});
