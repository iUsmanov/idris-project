import { lazy } from 'react';

export const [FTName]Async = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(
				// @ts-ignore
				() => resolve(import('./[FTName]').then((module) => ({ default: module.[FTName] }))),
				800
			);
		})
);
