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

		searchParams.forEach((value, key) => {
			switch (key) {
				case 'order':
					dispatch(articlesPageActions.setOrder(value as SortOrder));
					break;
				case 'sort':
					dispatch(articlesPageActions.setSort(value as ArticleSortField));
					break;
				case 'search':
					dispatch(articlesPageActions.setSearch(value));
					break;
				case 'type':
					dispatch(articlesPageActions.setType(value as ArticleType));
					break;
			}
		});

		dispatch(articlesPageActions.initState());
		dispatch(fetchArticlesList({}));
	}
);
