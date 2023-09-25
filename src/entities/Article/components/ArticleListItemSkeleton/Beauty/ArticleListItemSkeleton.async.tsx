import { FC, lazy } from 'react';
import { ArticleListItemSkeletonBeautyProps } from './ArticleListItemSkeleton';

const ArticleListItemSkeletonAsync = lazy<FC<ArticleListItemSkeletonBeautyProps>>(() =>
	import('./ArticleListItemSkeleton').then((module) => ({ default: module.ArticleListItemSkeleton }))
);

export { ArticleListItemSkeletonAsync as ArticleListItemSkeletonBeauty };
