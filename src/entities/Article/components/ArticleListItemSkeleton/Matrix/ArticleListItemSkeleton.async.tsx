import { FC, lazy } from 'react';
import { ArticleListItemSkeletonMatrixProps } from './ArticleListItemSkeleton';

const ArticleListItemSkeletonAsync = lazy<FC<ArticleListItemSkeletonMatrixProps>>(() =>
	import('./ArticleListItemSkeleton').then((module) => ({ default: module.ArticleListItemSkeleton }))
);

export { ArticleListItemSkeletonAsync as ArticleListItemSkeletonMatrix };
