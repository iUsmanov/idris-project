import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article, ArticleView } from '@/entities/Article';
import { ArticlesPageSchema } from '../types/articlesPage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';

export const initialState: ArticlesPageSchema = {
	ids: [],
	entities: {},
	isLoading: false,
	error: undefined,
	view: 'TILE',
	hasMore: true,
	limit: 9,
	page: 1,
	_inited: false,
};

const articlesPageAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id,
});

export const getArticles = articlesPageAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesPageAdapter.getInitialState()
);

export const articlesPageSlice = createSlice({
	name: 'articlesPageSlice',
	initialState: articlesPageAdapter.getInitialState<ArticlesPageSchema>(initialState),
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
					articlesPageAdapter.removeAll(state);
				}
			})
			.addCase(fetchArticlesList.fulfilled, (state, action /* : PayloadAction<Article[]> */) => {
				// state.data = action.payload;
				state.isLoading = false;
				state.hasMore = action.payload.length === state.limit;

				if (action.meta.arg.replace) {
					articlesPageAdapter.setAll(state, action.payload);
				} else {
					articlesPageAdapter.addMany(state, action.payload);
				}
			})
			.addCase(fetchArticlesList.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
