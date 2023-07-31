import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../consts/articlesInfiniteListConsts';

export const getArticlesInfiniteListIsLoading = (state: StateSchema) =>
	state.articlesInfiniteList?.isLoading || initialState.isLoading;

export const getArticlesInfiniteListError = (state: StateSchema) => state.articlesInfiniteList?.error;

export const getArticlesInfiniteListView = (state: StateSchema) =>
	state.articlesInfiniteList?.view || initialState.view;
export const getArticlesInfiniteListLimit = (state: StateSchema) =>
	state.articlesInfiniteList?.limit || 9;
export const getArticlesInfiniteListHasMore = (state: StateSchema) =>
	state.articlesInfiniteList?.hasMore;
export const getArticlesInfiniteListNumber = (state: StateSchema) =>
	state.articlesInfiniteList?.page || initialState.page;
export const getArticlesInfiniteListInited = (state: StateSchema) =>
	state.articlesInfiniteList?._inited || initialState._inited;
