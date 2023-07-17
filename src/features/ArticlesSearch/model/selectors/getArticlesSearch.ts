import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice/articlesSearchSlice';

export const getArticlesSearch = (state: StateSchema) =>
	state.articlesSearch?.search ?? initialState.search;
