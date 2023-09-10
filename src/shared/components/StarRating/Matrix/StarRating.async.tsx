import { FC, lazy } from 'react';
import { StarRatingMatrixProps } from './StarRating';

export const StarRatingAsync = lazy<FC<StarRatingMatrixProps>>(() =>
	import('./StarRating').then((module) => ({ default: module.StarRating }))
);
