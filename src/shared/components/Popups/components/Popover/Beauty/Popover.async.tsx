import { FC, lazy } from 'react';
import { PopoverBeautyProps } from './Popover';

export const PopoverAsync = lazy<FC<PopoverBeautyProps>>(() =>
	import('./Popover').then((module) => ({ default: module.Popover }))
);
