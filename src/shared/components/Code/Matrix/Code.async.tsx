import { FC, lazy } from 'react';
import { CodeMatrixProps } from './Code';

export const CodeAsync = lazy<FC<CodeMatrixProps>>(() =>
	import('./Code').then((module) => ({ default: module.Code }))
);
