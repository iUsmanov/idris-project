import { FC, lazy } from 'react';
import { IconBeautyProps } from './Icon';

export const IconAsync = lazy<FC<IconBeautyProps>>(() =>
	import('./Icon').then((module) => ({ default: module.Icon }))
);
