import { FC, lazy } from 'react';
import { RatingCardProps } from './RatingCard';

const RatingCardAsync = lazy<FC<RatingCardProps>>(() =>
	import('./RatingCard').then((module) => ({ default: module.RatingCard }))
);

export { RatingCardAsync as RatingCardBeauty };
