import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { initArticlesPage } from './initArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');
describe('initArticlesPage.test', () => {
	test('Success init', async () => {
		const thunk = new TestAsyncThunk(initArticlesPage, {
			articlesPage: {
				_inited: false,
			},
		});
		await thunk.callThunk();

		expect(thunk.dispatch).toHaveBeenCalledTimes(4);
		expect(fetchArticlesList).toHaveBeenCalledWith({ page: 1 });
	});
	test('Already init', async () => {
		const thunk = new TestAsyncThunk(initArticlesPage, {
			articlesPage: {
				_inited: true,
			},
		});
		await thunk.callThunk();

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(fetchArticlesList).not.toHaveBeenCalled();
	});
});
