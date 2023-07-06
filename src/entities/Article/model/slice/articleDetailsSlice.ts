import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';

export const initialState: ArticleDetailsSchema = {
	isLoading: false,
};

const articleDetailsSlice = createSlice({
	name: 'articleDetails',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchArticleById.pending, (state) => {
				state.data = undefined;
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchArticleById.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
