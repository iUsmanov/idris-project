import { lazy } from 'react';

export const ArticlesPageAsync = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(
				() =>
					// @ts-ignore
					resolve(import('./ArticlesPage').then((module) => ({ default: module.ArticlesPage }))),
				400
			);
		})
);
