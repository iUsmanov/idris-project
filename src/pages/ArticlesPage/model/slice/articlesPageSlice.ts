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
		},
		initState: (state) => {
			state.view = localStorage.getItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY) as ArticleView;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchArticlesList.pending, (state) => {
				// state.data = undefined;
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
				// state.data = action.payload;
				articlesPageAdapter.setAll(state, action.payload);
				state.isLoading = false;
			})
			.addCase(fetchArticlesList.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
