import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { getArticlesSortField, getArticlesSortOrder } from '@/features/ArticlesSort';
import { getArticlesType } from '@/features/ArticleTypeTabs';
import { getArticlesSearch } from '@/features/ArticlesSearch';
import {
	getArticlesInfiniteListLimit,
	getArticlesInfiniteListNumber,
} from '../../selectors/articlesInfiniteListSelectors';

interface FetchArticlesListProps {
	replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
	Article[],
	FetchArticlesListProps,
	ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (_, thunkAPI) => {
	const { rejectWithValue, extra, getState } = thunkAPI;
	const limit = getArticlesInfiniteListLimit(getState());
	const sort = getArticlesSortField(getState());
	const order = getArticlesSortOrder(getState());
	const search = getArticlesSearch(getState());
	const page = getArticlesInfiniteListNumber(getState());
	const type = getArticlesType(getState());
	try {
		addQueryParams({
			sort,
			order,
			search,
			type,
		});
		const response = await extra.api.get<Article[]>('/articles', {
			params: {
				_expand: 'user',
				_limit: limit,
				_page: page,
				_sort: sort,
				_order: order,
				q: search,
				type_like: type === 'ALL' ? undefined : type,
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
