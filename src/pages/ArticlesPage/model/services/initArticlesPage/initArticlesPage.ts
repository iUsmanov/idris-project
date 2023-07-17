import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesInited } from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { SortOrder } from '@/shared/types/sort';
import { ArticleType } from '@/entities/Article';
import { ArticlesSortField, articlesSortActions } from '@/features/ArticlesSort';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
	'articlesPage/initArticlesPage',
	async (searchParams, thunkAPI) => {
		const { getState, dispatch } = thunkAPI;
		const inited = getArticlesInited(getState());

		if (inited) return;

		searchParams.forEach((value, key) => {
			switch (key) {
				case 'order':
					dispatch(articlesSortActions.setOrder(value as SortOrder));
					break;
				case 'sort':
					dispatch(articlesSortActions.setSort(value as ArticlesSortField));
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
