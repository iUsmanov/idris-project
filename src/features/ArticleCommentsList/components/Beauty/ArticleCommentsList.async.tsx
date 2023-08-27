import { FC, lazy } from 'react';
import { ArticleCommentsListProps } from './ArticleCommentsList';

const ArticleCommentsListAsync = lazy<FC<ArticleCommentsListProps>>(() =>
	import('./ArticleCommentsList').then((module) => ({ default: module.ArticleCommentsList }))
);

export { ArticleCommentsListAsync as ArticleCommentsListBeauty };
