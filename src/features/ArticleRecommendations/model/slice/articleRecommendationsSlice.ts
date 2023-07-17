import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ArticleRecommendationsSchema } from '../types/articleRecommendations';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { Article } from '@/entities/Article';
import { StateSchema } from '@/app/providers/StoreProvider';

export const initialState: ArticleRecommendationsSchema = {
	ids: [],
	entities: {},
	isLoading: false,
	error: undefined,
};

const articleRecommendationsAdapter = createEntityAdapter<Article>({});

export const getArticleRecommendations = articleRecommendationsAdapter.getSelectors<StateSchema>(
	(state) => state.articleRecommendations || articleRecommendationsAdapter.getInitialState()
);

export const articleRecommendationsSlice = createSlice({
	name: 'articleRecommendations',
	initialState:
		articleRecommendationsAdapter.getInitialState<ArticleRecommendationsSchema>(initialState),
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchArticleRecommendations.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
				state.isLoading = false;
				articleRecommendationsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchArticleRecommendations.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { actions: articleRecommendationsActions } = articleRecommendationsSlice;
export const { reducer: articleRecommendationsReducer } = articleRecommendationsSlice;
