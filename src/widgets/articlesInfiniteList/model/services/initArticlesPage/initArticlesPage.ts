import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesInfiniteListActions } from '../../slices/articlesInfiniteListSlice';
import { getArticlesInfiniteListInited } from '../../selectors/articlesInfiniteListSelectors';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
	'articlesPage/initArticlesPage',
	async (_, thunkAPI) => {
		const { getState, dispatch } = thunkAPI;
		const inited = getArticlesInfiniteListInited(getState());

		if (inited) return;
		dispatch(articlesInfiniteListActions.initState());
		dispatch(fetchArticlesList({}));
	}
);
