import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(
				() =>
					resolve(
						// @ts-ignore
						import('./ArticleDetailsPage').then((module) => ({
							default: module.ArticleDetailsPage,
						}))
					),
				400
			);
		})
);
