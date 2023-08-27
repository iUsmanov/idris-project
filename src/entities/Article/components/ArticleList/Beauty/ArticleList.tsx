import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';

export interface ArticleListProps {
	className?: string;
}

export const ArticleList = memo((props: ArticleListProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articleList, {}, [className])}></div>;
});
