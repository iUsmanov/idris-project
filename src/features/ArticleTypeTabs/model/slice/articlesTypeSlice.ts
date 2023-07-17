import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticlesTypeSchema } from '../types/articlesType';
import { ArticleType } from '@/entities/Article';

export const initialState: ArticlesTypeSchema = {
	type: 'ALL',
};

export const articlesTypeSlice = createSlice({
	name: 'articlesType',
	initialState,
	reducers: {
		setType: (state, action: PayloadAction<ArticleType>) => {
			state.type = action.payload;
		},
	},
});

export const { actions: articlesTypeActions } = articlesTypeSlice;
export const { reducer: articlesTypeReducer } = articlesTypeSlice;
