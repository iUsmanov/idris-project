import { FC, lazy } from 'react';
import { ArticlesSortProps } from './ArticlesSort';

const ArticlesSortAsync = lazy<FC<ArticlesSortProps>>(() =>
	import('./ArticlesSort').then((module) => ({ default: module.ArticlesSort }))
);

export { ArticlesSortAsync as ArticlesSortBeauty };
