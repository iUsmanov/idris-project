import { FC, lazy } from 'react';
import { ArticleDetailsHeaderPropsBeauty } from './ArticleDetailsHeader';

const ArticleDetailsHeaderAsync = lazy<FC<ArticleDetailsHeaderPropsBeauty>>(() =>
	import('./ArticleDetailsHeader').then((module) => ({ default: module.ArticleDetailsHeader }))
);

export { ArticleDetailsHeaderAsync as ArticleDetailsHeaderBeauty };
