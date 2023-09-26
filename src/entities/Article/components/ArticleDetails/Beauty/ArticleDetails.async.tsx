import { FC, lazy } from 'react';
import { ArticleDetailsProps } from './ArticleDetails';

const ArticleDetailsAsync = lazy<FC<ArticleDetailsProps>>(() =>
	import('./ArticleDetails').then((module) => ({ default: module.ArticleDetails }))
);

export { ArticleDetailsAsync as ArticleDetailsBeauty };
