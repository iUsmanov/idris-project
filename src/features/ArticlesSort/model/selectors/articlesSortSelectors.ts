import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice/articlesSortSlice';

export const getArticlesSortField = (state: StateSchema) =>
	state.articlesSort?.sort ?? initialState.sort;
export const getArticlesSortOrder = (state: StateSchema) =>
	state.articlesSort?.order ?? initialState.order;
