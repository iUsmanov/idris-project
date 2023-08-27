import { FC, lazy } from 'react';
import { CommentCardProps } from './CommentCard';

const CommentCardAsync = lazy<FC<CommentCardProps>>(() =>
	import('./CommentCard').then((module) => ({ default: module.CommentCard }))
);

export { CommentCardAsync as CommentCardBeauty };
