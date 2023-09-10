import { FC, lazy } from 'react';
import { StarRatingBeautyProps } from './StarRating';

export const StarRatingAsync = lazy<FC<StarRatingBeautyProps>>(() =>
	import('./StarRating').then((module) => ({ default: module.StarRating }))
);
