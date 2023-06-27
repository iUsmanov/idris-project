import { lazy } from 'react';

export const ProfilePageAsync = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(
				// @ts-ignore
				() => resolve(import('./ProfilePage').then((module) => ({ default: module.ProfilePage }))),
				800
			);
		})
);
// @ts-ignore
// const ProfilePageLazy = lazy(() => import('./MainPage').then((module) => ({ default: module.MainPage })));
