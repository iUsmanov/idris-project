import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItemSkeleton.module.scss';

export interface ArticleListItemSkeletonProps {
	className?: string;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articleListItemSkeleton, {}, [className])}></div>;
});
