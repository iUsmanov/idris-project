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
}
