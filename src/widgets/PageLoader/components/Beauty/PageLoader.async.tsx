import { FC, lazy } from 'react';
import { PageLoaderBeautyProps } from './PageLoader';

const PageLoaderAsync = lazy<FC<PageLoaderBeautyProps>>(() =>
	import('./PageLoader').then((module) => ({ default: module.PageLoader }))
);

export { PageLoaderAsync as PageLoaderBeauty };
