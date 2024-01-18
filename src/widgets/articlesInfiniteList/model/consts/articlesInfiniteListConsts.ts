import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';
import { ArticlesInfiniteListSchema } from '../types/articlesInfiniteListSchema';
import { ArticleView } from '@/entities/Article';

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

export const defaultArticleView: ArticleView =
	(localStorage.getItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY) as ArticleView) || 'TILE';
