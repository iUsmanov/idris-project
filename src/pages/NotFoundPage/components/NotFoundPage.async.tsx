import { lazy } from 'react';

export const NotFoundPageAsync = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(
				() =>
					// @ts-ignore
					resolve(import('./NotFoundPage').then((module) => ({ default: module.NotFoundPage }))),
				800
			);
		})
);
// @ts-ignore
// const AboutPageLazy = lazy(() => import('./NotFoundPage').then((module) => ({ default: module.NotFoundPage })));
