import { FC, lazy } from 'react';
import { CardMatrixProps } from './Card';

export const CardAsync = lazy<FC<CardMatrixProps>>(() =>
	import('./Card').then((module) => ({ default: module.Card }))
);
