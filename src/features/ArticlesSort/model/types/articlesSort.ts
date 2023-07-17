import { SortOrder } from '@/shared/types/sort';

export type ArticlesSortField = 'createdAt' | 'views' | 'title';

export interface ArticlesSortSchema {
	order: SortOrder;
	sort: ArticlesSortField;
}
