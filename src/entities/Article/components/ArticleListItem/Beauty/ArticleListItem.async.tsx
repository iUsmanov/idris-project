import { FC, lazy } from 'react';
import { ArticleListItemProps } from './ArticleListItem';

const ArticleListItemAsync = lazy<FC<ArticleListItemProps>>(() =>
	import('./ArticleListItem').then((module) => ({ default: module.ArticleListItem }))
);

export { ArticleListItemAsync as ArticleListItemBeauty };
