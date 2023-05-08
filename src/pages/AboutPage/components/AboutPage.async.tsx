import { lazy } from 'react';

export const AboutPageAsync = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(
				// @ts-ignore
				() => resolve(import('./AboutPage').then((module) => ({ default: module.AboutPage }))),
				800
			);
		})
);
// @ts-ignore
// const AboutPageLazy = lazy(() => import('./MainPage').then((module) => ({ default: module.MainPage })));
