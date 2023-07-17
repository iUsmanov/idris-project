import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticlesSearchSchema } from '../types/articlesSearch';

export const initialState: ArticlesSearchSchema = {
	search: '',
};

export const articlesSearchSlice = createSlice({
	name: 'articlesSearch',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},
});

export const { actions: articlesSearchActions } = articlesSearchSlice;
export const { reducer: articlesSearchReducer } = articlesSearchSlice;
