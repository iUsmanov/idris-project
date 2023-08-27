import { FC, lazy } from 'react';
import { AddNewCommentProps } from './AddNewComment';

const AddNewCommentAsync = lazy<FC<AddNewCommentProps>>(() =>
	import('./AddNewComment').then((module) => ({ default: module.AddNewComment }))
);

export { AddNewCommentAsync as AddNewCommentBeauty };
