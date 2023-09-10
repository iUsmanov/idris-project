import { FC, lazy } from 'react';
import { TextMatrixProps } from './Text';

export const TextAsync = lazy<FC<TextMatrixProps>>(() =>
	import('./Text').then((module) => ({ default: module.Text }))
);
