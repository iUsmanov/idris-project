import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice/articleCommentsListSlice';

export const getArticleCommentsListIsLoading = (state: StateSchema) =>
	state.articleCommentsList?.isLoading || initialState.isLoading;

export const getArticleCommentsListError = (state: StateSchema) => state.articleCommentsList?.error;
