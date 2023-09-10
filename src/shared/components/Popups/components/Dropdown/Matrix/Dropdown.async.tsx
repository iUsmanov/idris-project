import { FC, lazy } from 'react';
import { DropdownMatrixProps } from './Dropdown';

export const DropdownAsync = lazy<FC<DropdownMatrixProps>>(() =>
	import('./Dropdown').then((module) => ({ default: module.Dropdown }))
);
