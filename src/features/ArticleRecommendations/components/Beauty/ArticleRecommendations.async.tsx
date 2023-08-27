import { FC, lazy } from 'react';
import { ArticleRecommendationsProps } from './ArticleRecommendations';

const ArticleRecommendationsAsync = lazy<FC<ArticleRecommendationsProps>>(() =>
	import('./ArticleRecommendations').then((module) => ({ default: module.ArticleRecommendations }))
);

export { ArticleRecommendationsAsync as ArticleRecommendationsBeauty };
