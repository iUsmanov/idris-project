import { FC, lazy } from 'react';
import { CardBeautyProps } from './Card';

export const CardAsync = lazy<FC<CardBeautyProps>>(() =>
	import('./Card').then((module) => ({ default: module.Card }))
);
