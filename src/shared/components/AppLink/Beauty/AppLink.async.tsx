import { FC, lazy } from 'react';
import { AppLinkBeautyProps } from './AppLink';

export const AppLinkAsync = lazy<FC<AppLinkBeautyProps>>(() =>
	import('./AppLink').then((module) => ({ default: module.AppLink }))
);
