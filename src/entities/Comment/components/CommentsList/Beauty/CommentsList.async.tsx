import { FC, lazy } from 'react';
import { CommentsListProps } from './CommentsList';

const CommentsListAsync = lazy<FC<CommentsListProps>>(() =>
	import('./CommentsList').then((module) => ({ default: module.CommentsList }))
);

export { CommentsListAsync as CommentsListBeauty };
