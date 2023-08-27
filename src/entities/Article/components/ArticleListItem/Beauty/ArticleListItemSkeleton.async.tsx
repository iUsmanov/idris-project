import { FC, lazy } from 'react';
import { ArticleListItemSkeletonProps } from './ArticleListItemSkeleton';

const ArticleListItemSkeletonAsync = lazy<FC<ArticleListItemSkeletonProps>>(() =>
	import('./ArticleListItemSkeleton').then((module) => ({ default: module.ArticleListItemSkeleton }))
);

export { ArticleListItemSkeletonAsync as ArticleListItemSkeletonBeauty };
