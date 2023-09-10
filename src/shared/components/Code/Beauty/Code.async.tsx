import { FC, lazy } from 'react';
import { CodeBeautyProps } from './Code';

export const CodeAsync = lazy<FC<CodeBeautyProps>>(() =>
	import('./Code').then((module) => ({ default: module.Code }))
);
