import { createSlice } from '@reduxjs/toolkit';
import { AddNewCommentSchema } from '@/features/AddNewComment';
import { sendArticleComment } from '../services/sendArticleComment/sendArticleComment';

const initialState: AddNewCommentSchema = {};

export const articleCommentsSlice = createSlice({
	name: 'articleComments',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(sendArticleComment.rejected, (state, action) => {
			state.error = action.payload;
		});
	},
});

export const { actions: articleCommentsActions } = articleCommentsSlice;
export const { reducer: articleCommentsReducer } = articleCommentsSlice;
