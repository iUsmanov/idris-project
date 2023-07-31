import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article, ArticleView } from '@/entities/Article';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';
import { ArticlesInfiniteListSchema } from '../types/articlesInfiniteListSchema';
import { initialState } from '../consts/articlesInfiniteListConsts';

const articlesInfiniteListAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id,
});

export const getArticlesInfiniteList = articlesInfiniteListAdapter.getSelectors<StateSchema>(
	(state) => state.articlesInfiniteList || articlesInfiniteListAdapter.getInitialState()
);

export const articlesInfiniteListSlice = createSlice({
	name: 'articlesInfiniteListSlice',
	initialState: articlesInfiniteListAdapter.getInitialState<ArticlesInfiniteListSchema>(initialState),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			state.limit = state.view === 'LIST' ? 4 : 9;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		initState: (state) => {
			const view = localStorage.getItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY) as ArticleView;
			state.view = view;
			state.limit = state.view === 'LIST' ? 4 : 9;
			state._inited = true;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchArticlesList.pending, (state, action) => {
				// state.data = undefined;
				state.error = undefined;
				state.isLoading = true;

				if (action.meta.arg.replace) {
					articlesInfiniteListAdapter.removeAll(state);
				}
			})
			.addCase(fetchArticlesList.fulfilled, (state, action /* : PayloadAction<Article[]> */) => {
				// state.data = action.payload;
				state.isLoading = false;
				state.hasMore = action.payload.length === state.limit;

				if (action.meta.arg.replace) {
					articlesInfiniteListAdapter.setAll(state, action.payload);
				} else {
					articlesInfiniteListAdapter.addMany(state, action.payload);
				}
			})
			.addCase(fetchArticlesList.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { actions: articlesInfiniteListActions } = articlesInfiniteListSlice;
export const { reducer: articlesInfiniteListReducer } = articlesInfiniteListSlice;
