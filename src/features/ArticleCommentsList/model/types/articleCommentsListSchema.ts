import { Comment } from '@/entities/Comment';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleCommentsListSchema extends EntityState<Comment> {
	// ids: string[];
	// entities: Record<any, any>;
	// =======
	// data?: Comment[];
	isLoading?: boolean;
	error?: string;
}
