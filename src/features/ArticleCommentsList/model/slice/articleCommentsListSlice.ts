import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ArticleCommentsListSchema } from '../types/articleCommentsListSchema';
import { Comment } from '@/entities/Comment';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchArticleCommentsByArticleId } from '../services/fetchArticleCommentsByArticleId/fetchArticleCommentsByArticleId';
import { sendArticleComment } from '../services/sendArticleComment/sendArticleComment';

export const initialState: ArticleCommentsListSchema = {
	ids: [],
	entities: {},
	isCommentsLoading: false,
	isSendLoading: false,
	commentsError: undefined,
	sendError: undefined,
};

export const articleCommentsListAdapter = createEntityAdapter<Comment>({
	selectId: (comment) => comment.id,
});

export const getArticleCommentsList = articleCommentsListAdapter.getSelectors<StateSchema>(
	(state) => state.articleCommentsList || articleCommentsListAdapter.getInitialState()
);

export const articleCommentsListSlice = createSlice({
	name: 'articleCommentsListSlice',
	initialState: articleCommentsListAdapter.getInitialState<ArticleCommentsListSchema>(initialState),
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchArticleCommentsByArticleId.pending, (state) => {
				// state.data = undefined;
				state.commentsError = undefined;
				state.isCommentsLoading = true;
			})
			.addCase(
				fetchArticleCommentsByArticleId.fulfilled,
				(state, action: PayloadAction<Comment[]>) => {
					// state.data = action.payload;
					articleCommentsListAdapter.setAll(state, action.payload);
					state.isCommentsLoading = false;
				}
			)
			.addCase(fetchArticleCommentsByArticleId.rejected, (state, action) => {
				state.commentsError = action.payload;
				state.isCommentsLoading = false;
			})
			//
			.addCase(sendArticleComment.pending, (state) => {
				state.sendError = undefined;
				state.isSendLoading = true;
			})
			.addCase(sendArticleComment.fulfilled, (state) => {
				state.isSendLoading = false;
			})
			.addCase(sendArticleComment.rejected, (state, action) => {
				state.sendError = action.payload;
				state.isSendLoading = false;
			});
	},
});

export const { actions: articleCommentsListActions } = articleCommentsListSlice;
export const { reducer: articleCommentsListReducer } = articleCommentsListSlice;
