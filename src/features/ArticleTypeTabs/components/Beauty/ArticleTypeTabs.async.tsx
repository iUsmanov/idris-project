import { FC, lazy } from 'react';
import { ArticleTypeTabsProps } from './ArticleTypeTabs';

const ArticleTypeTabsAsync = lazy<FC<ArticleTypeTabsProps>>(() =>
	import('./ArticleTypeTabs').then((module) => ({ default: module.ArticleTypeTabs }))
);

export { ArticleTypeTabsAsync as ArticleTypeTabsBeauty };
