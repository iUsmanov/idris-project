import { FC, lazy } from 'react';
import { AddNewCommentProps } from './AddNewComment';

export const AddNewCommentAsync = lazy<FC<AddNewCommentProps>>(
	() =>
		new Promise((resolve) => {
			setTimeout(
				() =>
					resolve(
						// @ts-ignore
						import('./AddNewComment').then((module) => ({
							default: module.AddNewComment,
						}))
					),
				800
			);
		})
);
