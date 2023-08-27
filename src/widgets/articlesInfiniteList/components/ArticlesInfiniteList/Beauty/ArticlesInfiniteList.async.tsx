import { FC, lazy } from 'react';
import { ArticlesInfiniteListProps } from './ArticlesInfiniteList';

const ArticlesInfiniteListAsync = lazy<FC<ArticlesInfiniteListProps>>(() =>
	import('./ArticlesInfiniteList').then((module) => ({ default: module.ArticlesInfiniteList }))
);

export { ArticlesInfiniteListAsync as ArticlesInfiniteListBeauty };
