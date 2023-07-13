import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesLimit } from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
	page: number;
}

export const fetchArticlesList = createAsyncThunk<
	Article[],
	FetchArticlesListProps,
	ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (args, thunkAPI) => {
	const { rejectWithValue, extra, getState } = thunkAPI;
	const { page = 1 } = args;
	const limit = getArticlesLimit(getState());
	try {
		const response = await extra.api.get<Article[]>('/articles', {
			params: {
				_expand: 'user',
				_limit: limit,
				_page: page,
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
