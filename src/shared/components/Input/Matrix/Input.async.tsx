import { FC, lazy } from 'react';
import { InputMatrixProps } from './Input';

export const InputAsync = lazy<FC<InputMatrixProps>>(() =>
	import('./Input').then((module) => ({ default: module.Input }))
);
