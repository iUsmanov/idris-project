import { FC, lazy } from 'react';
import { ArticleListProps } from './ArticleList';

const ArticleListAsync = lazy<FC<ArticleListProps>>(() =>
	import('./ArticleList').then((module) => ({ default: module.ArticleList }))
);

export { ArticleListAsync as ArticleListBeauty };
