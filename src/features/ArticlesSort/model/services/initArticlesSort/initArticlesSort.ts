import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SortOrder } from '@/shared/types/sort';
import { ArticlesSortField } from '../../types/articlesSort';
import { articlesSortActions } from '../../slice/articlesSortSlice';

export const initArticlesSort = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
	'articlesSort/initArticlesSort',
	async (searchParams, thunkAPI) => {
		const { dispatch } = thunkAPI;

		const orderFromURL = searchParams.get('order') as SortOrder;
		const sortFromURL = searchParams.get('sort') as ArticlesSortField;

		if (orderFromURL) {
			dispatch(articlesSortActions.setOrder(orderFromURL));
		}

		if (sortFromURL) {
			dispatch(articlesSortActions.setSort(sortFromURL));
		}
	}
);
