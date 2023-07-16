import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesInited } from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField, ArticleType } from '@/entities/Article';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
	'articlesPage/initArticlesPage',
	async (searchParams, thunkAPI) => {
		const { getState, dispatch } = thunkAPI;
		const inited = getArticlesInited(getState());

		if (inited) return;
		const orderFromURL = searchParams.get('order') as SortOrder;
		const sortFromURL = searchParams.get('sort') as ArticleSortField;
		const searchFromURL = searchParams.get('search');
		const typeFromURL = searchParams.get('type') as ArticleType;

		if (orderFromURL) {
			dispatch(articlesPageActions.setOrder(orderFromURL));
		}

		if (sortFromURL) {
			dispatch(articlesPageActions.setSort(sortFromURL));
		}

		if (searchFromURL) {
			dispatch(articlesPageActions.setSearch(searchFromURL));
		}

		if (typeFromURL) {
			dispatch(articlesPageActions.setType(typeFromURL));
		}

		dispatch(articlesPageActions.initState());
		dispatch(fetchArticlesList({}));
	}
);
