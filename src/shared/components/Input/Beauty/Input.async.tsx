import { FC, lazy } from 'react';
import { InputBeautyProps } from './Input';

export const InputAsync = lazy<FC<InputBeautyProps>>(() =>
	import('./Input').then((module) => ({ default: module.Input }))
);
