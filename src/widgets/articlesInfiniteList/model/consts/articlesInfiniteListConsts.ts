import { ArticlesInfiniteListSchema } from '../types/articlesInfiniteListSchema';

export const initialState: ArticlesInfiniteListSchema = {
	ids: [],
	entities: {},
	isLoading: false,
	error: undefined,
	view: 'TILE',
	hasMore: true,
	limit: 9,
	page: 1,
	_inited: false,
};
