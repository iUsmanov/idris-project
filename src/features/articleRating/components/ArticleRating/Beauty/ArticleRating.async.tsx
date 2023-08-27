import { FC, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';

const ArticleRatingAsync = lazy<FC<ArticleRatingProps>>(() =>
	import('./ArticleRating').then((module) => ({ default: module.ArticleRating }))
);

export { ArticleRatingAsync as ArticleRatingBeauty };
