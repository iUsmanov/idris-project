import { FC, lazy } from 'react';
import { PopoverMatrixProps } from './Popover';

export const PopoverAsync = lazy<FC<PopoverMatrixProps>>(() =>
	import('./Popover').then((module) => ({ default: module.Popover }))
);
