import { FC, lazy } from 'react';
import { ArticleViewSelectorProps } from './ArticleViewSelector';

const ArticleViewSelectorAsync = lazy<FC<ArticleViewSelectorProps>>(() =>
	import('./ArticleViewSelector').then((module) => ({ default: module.ArticleViewSelector }))
);

export { ArticleViewSelectorAsync as ArticleViewSelectorBeauty };
