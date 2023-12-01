import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleById } from './fetchArticleById';
import { mockArticle } from '../../../testing';

describe('fetchArticleById.test', () => {
	test('Success load', async () => {
		const thunk = new TestAsyncThunk(fetchArticleById);
		thunk.api.get.mockResolvedValue({ data: mockArticle });
		const action = await thunk.callThunk('1');

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.get).toHaveBeenCalled();
		expect(action.meta.requestStatus).toEqual('fulfilled');
		expect(action.payload).toEqual(mockArticle);
	});
	test('Success load', async () => {
		const thunk = new TestAsyncThunk(fetchArticleById);
		thunk.api.get.mockResolvedValue({ status: 403 });
		const action = await thunk.callThunk('1');

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.get).toHaveBeenCalled();
		expect(action.meta.requestStatus).toEqual('rejected');
		expect(action.payload).toEqual('error');
	});
});
