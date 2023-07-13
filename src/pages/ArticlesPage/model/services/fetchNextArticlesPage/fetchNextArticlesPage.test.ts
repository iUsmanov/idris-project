import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');
describe('fetchNextArticlesPage.test', () => {
	test('Success load', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
			articlesPage: {
				ids: [],
				entities: {},
				page: 2,
				hasMore: true,
				limit: 5,
				isLoading: false,
			},
		});
		await thunk.callThunk();

		expect(thunk.dispatch).toHaveBeenCalledTimes(4);
		expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
	});
	test('fetch Article not called cause hasMore is false', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
			articlesPage: {
				ids: [],
				entities: {},
				page: 2,
				hasMore: false,
				limit: 5,
				isLoading: false,
			},
		});
		await thunk.callThunk();

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(fetchArticlesList).not.toHaveBeenCalled();
	});
	test('fetch Article not called cause isLoading is true', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
			articlesPage: {
				ids: [],
				entities: {},
				page: 2,
				hasMore: true,
				limit: 5,
				isLoading: true,
			},
		});
		await thunk.callThunk();

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(fetchArticlesList).not.toHaveBeenCalled();
	});
});
