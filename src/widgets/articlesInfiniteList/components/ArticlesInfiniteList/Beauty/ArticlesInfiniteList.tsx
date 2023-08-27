import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesInfiniteList.module.scss';

export interface ArticlesInfiniteListProps {
	className?: string;
}

export const ArticlesInfiniteList = memo((props: ArticlesInfiniteListProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articlesInfiniteList, {}, [className])}></div>;
});
