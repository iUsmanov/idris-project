import { FC, lazy } from 'react';
import { DropdownBeautyProps } from './Dropdown';

export const DropdownAsync = lazy<FC<DropdownBeautyProps>>(() =>
	import('./Dropdown').then((module) => ({ default: module.Dropdown }))
);
