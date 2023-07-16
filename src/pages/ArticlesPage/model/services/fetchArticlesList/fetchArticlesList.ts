import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	getArticlesLimit,
	getArticlesNumber,
	getArticlesOrder,
	getArticlesSearch,
	getArticlesSort,
} from '../../selectors/articlesPageSelectors';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface FetchArticlesListProps {
	replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
	Article[],
	FetchArticlesListProps,
	ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (_, thunkAPI) => {
	const { rejectWithValue, extra, getState } = thunkAPI;
	const limit = getArticlesLimit(getState());
	const sort = getArticlesSort(getState());
	const order = getArticlesOrder(getState());
	const search = getArticlesSearch(getState());
	const page = getArticlesNumber(getState());
	try {
		addQueryParams({
			sort,
			order,
			search,
		});
		const response = await extra.api.get<Article[]>('/articles', {
			params: {
				_expand: 'user',
				_limit: limit,
				_page: page,
				_sort: sort,
				_order: order,
				q: search,
			},
		});
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
