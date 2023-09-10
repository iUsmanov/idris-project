import { FC, lazy } from 'react';
import { TextBeautyProps } from './Text';

export const TextAsync = lazy<FC<TextBeautyProps>>(() =>
	import('./Text').then((module) => ({ default: module.Text }))
);
