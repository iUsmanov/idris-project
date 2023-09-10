import { FC, lazy } from 'react';
import { ButtonBeautyProps } from './Button';

export const ButtonAsync = lazy<FC<ButtonBeautyProps>>(() =>
	import('./Button').then((module) => ({ default: module.Button }))
);
