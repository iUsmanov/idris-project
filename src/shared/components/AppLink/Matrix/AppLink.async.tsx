import { FC, lazy } from 'react';
import { AppLinkMatrixProps } from './AppLink';

export const AppLinkAsync = lazy<FC<AppLinkMatrixProps>>(() =>
	import('./AppLink').then((module) => ({ default: module.AppLink }))
);
