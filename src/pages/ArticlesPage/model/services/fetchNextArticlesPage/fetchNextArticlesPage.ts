import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	getArticlesHasMore,
	getArticlesIsLoading,
	getArticlesNumber,
} from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slice/articlesPageSlice';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
	'articlesPage/fetchNextArticlesPage',
	async (_, thunkAPI) => {
		const { getState, dispatch } = thunkAPI;
		const page = getArticlesNumber(getState());
		const hasMore = getArticlesHasMore(getState());
		const isLoading = getArticlesIsLoading(getState());

		if (!hasMore || isLoading) return;
		dispatch(fetchArticlesList({ page: page + 1 }));
		dispatch(articlesPageActions.setPage(page + 1));
	}
);
