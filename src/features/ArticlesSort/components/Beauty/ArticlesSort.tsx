import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesSort.module.scss';

export interface ArticlesSortProps {
	className?: string;
}

export const ArticlesSort = memo((props: ArticlesSortProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articlesSort, {}, [className])}></div>;
});
