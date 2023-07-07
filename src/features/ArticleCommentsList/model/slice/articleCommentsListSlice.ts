import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ArticleCommentsListSchema } from '../types/articleCommentsListSchema';
import { Comment } from '@/entities/Comment';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchArticleCommentsByArticleId } from '../services/fetchArticleCommentsByArticleId/fetchArticleCommentsByArticleId';

export const initialState: ArticleCommentsListSchema = {
	ids: [],
	entities: {},
	isLoading: false,
	error: undefined,
};

const articleCommentsListAdapter = createEntityAdapter<Comment>({
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
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchArticleCommentsByArticleId.fulfilled,
				(state, action: PayloadAction<Comment[]>) => {
					// state.data = action.payload;
					articleCommentsListAdapter.setAll(state, action.payload);
					state.isLoading = false;
				}
			)
			.addCase(fetchArticleCommentsByArticleId.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { actions: articleCommentsListActions } = articleCommentsListSlice;
export const { reducer: articleCommentsListReducer } = articleCommentsListSlice;
