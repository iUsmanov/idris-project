import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice/articleCommentsListSlice';

export const getArticleCommentsListIsCommentsLoading = (state: StateSchema) =>
	state.articleCommentsList?.isCommentsLoading || initialState.isCommentsLoading;

export const getArticleCommentsListCommentsError = (state: StateSchema) =>
	state.articleCommentsList?.commentsError;

export const getArticleCommentsListIsSendLoading = (state: StateSchema) =>
	state.articleCommentsList?.isSendLoading || initialState.isSendLoading;

export const getArticleCommentsListSendError = (state: StateSchema) =>
	state.articleCommentsList?.sendError;
