import { Article, ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticlesPageSchema extends EntityState<Article> {
	// ids: string[];
	// entities: Record<any, any>;
	// =======
	// data?: Comment[];
	isLoading?: boolean;
	error?: string;
	view: ArticleView;
	_inited: boolean;
	// pagination
	page: number;
	limit: number;
	hasMore: boolean;
	// Filters
	order: SortOrder;
	sort: ArticleSortField;
	search: string;
	type: ArticleType;
}
