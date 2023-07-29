import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { getArticlesInfiniteListHasMore, getArticlesInfiniteListIsLoading, getArticlesInfiniteListNumber } from '../../selectors/articlesInfiniteListSelectors';
import { articlesInfiniteListActions } from '../../slices/articlesInfiniteListSlice';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
	'articlesPage/fetchNextArticlesPage',
	async (_, thunkAPI) => {
		const { getState, dispatch } = thunkAPI;
		const page = getArticlesInfiniteListNumber(getState());
		const hasMore = getArticlesInfiniteListHasMore(getState());
		const isLoading = getArticlesInfiniteListIsLoading(getState());

		if (!hasMore || isLoading) return;
		dispatch(articlesInfiniteListActions.setPage(page + 1));
		dispatch(fetchArticlesList({}));
	}
);
