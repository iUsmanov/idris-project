import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { articlesSearchActions } from '../../slice/articlesSearchSlice';

export const initArticlesSearch = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
	'articlesSearch/initArticlesSearch',
	async (searchParams, thunkAPI) => {
		const { dispatch } = thunkAPI;

		const searchFromURL = searchParams.get('search');

		if (searchFromURL) {
			dispatch(articlesSearchActions.setSearch(searchFromURL));
		}
	}
);
