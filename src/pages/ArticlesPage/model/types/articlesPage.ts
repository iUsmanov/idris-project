import { Article, ArticleView } from '@/entities/Article';
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
	search: string;
}
