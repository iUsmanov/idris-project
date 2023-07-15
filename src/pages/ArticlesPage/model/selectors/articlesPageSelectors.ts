import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice/articlesPageSlice';

export const getArticlesIsLoading = (state: StateSchema) =>
	state.articlesPage?.isLoading || initialState.isLoading;

export const getArticlesError = (state: StateSchema) => state.articlesPage?.error;

export const getArticlesView = (state: StateSchema) => state.articlesPage?.view || initialState.view;
export const getArticlesLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlesHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesNumber = (state: StateSchema) => state.articlesPage?.page || initialState.page;
export const getArticlesInited = (state: StateSchema) =>
	state.articlesPage?._inited || initialState._inited;

export const getArticlesSort = (state: StateSchema) => state.articlesPage?.sort ?? initialState.sort;
export const getArticlesOrder = (state: StateSchema) => state.articlesPage?.order ?? initialState.order;
export const getArticlesSearch = (state: StateSchema) =>
	state.articlesPage?.search ?? initialState.search;
