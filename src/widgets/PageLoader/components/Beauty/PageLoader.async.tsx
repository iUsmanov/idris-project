import { lazy } from 'react';

const PageLoaderAsync = lazy(() =>
	import('./PageLoader').then((module) => ({ default: module.PageLoader }))
);

export { PageLoaderAsync as PageLoaderBeauty };
