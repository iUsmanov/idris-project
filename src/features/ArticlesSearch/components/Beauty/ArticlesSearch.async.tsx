import { FC, lazy } from 'react';
import { ArticlesSearchProps } from './ArticlesSearch';

const ArticlesSearchAsync = lazy<FC<ArticlesSearchProps>>(() =>
	import('./ArticlesSearch').then((module) => ({ default: module.ArticlesSearch }))
);

export { ArticlesSearchAsync as ArticlesSearchBeauty };
