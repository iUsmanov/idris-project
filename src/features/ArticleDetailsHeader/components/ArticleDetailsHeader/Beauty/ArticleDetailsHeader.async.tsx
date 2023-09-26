import { FC, lazy } from 'react';
import { ArticleDetailsHeaderProps } from './ArticleDetailsHeader';

const ArticleDetailsHeaderAsync = lazy<FC<ArticleDetailsHeaderProps>>(() =>
	import('./ArticleDetailsHeader').then((module) => ({ default: module.ArticleDetailsHeader }))
);

export { ArticleDetailsHeaderAsync as ArticleDetailsHeaderBeauty };
