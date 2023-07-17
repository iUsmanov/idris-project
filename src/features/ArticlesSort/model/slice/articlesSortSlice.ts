import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticlesSortField, ArticlesSortSchema } from '../types/articlesSort';
import { SortOrder } from '@/shared/types/sort';

export const initialState: ArticlesSortSchema = {
	sort: 'createdAt',
	order: 'asc',
};

export const articlesSortSlice = createSlice({
	name: 'articlesSort',
	initialState,
	reducers: {
		setSort: (state, action: PayloadAction<ArticlesSortField>) => {
			state.sort = action.payload;
		},
		setOrder: (state, action: PayloadAction<SortOrder>) => {
			state.order = action.payload;
		},
	},
});

export const { actions: articlesSortActions } = articlesSortSlice;
export const { reducer: articlesSortReducer } = articlesSortSlice;
