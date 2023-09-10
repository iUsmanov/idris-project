import { FC, lazy } from 'react';
import { ButtonMatrixProps } from './Button';

export const ButtonAsync = lazy<FC<ButtonMatrixProps>>(() =>
	import('./Button').then((module) => ({ default: module.Button }))
);
