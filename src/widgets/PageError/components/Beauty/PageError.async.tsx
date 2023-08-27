import { FC, lazy } from 'react';
import { PageErrorProps } from './PageError';

const PageErrorAsync = lazy<FC<PageErrorProps>>(() =>
	import('./PageError').then((module) => ({ default: module.PageError }))
);

export { PageErrorAsync as PageErrorBeauty };
