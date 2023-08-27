import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';

export interface ArticleListItemProps {
	className?: string;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articleListItem, {}, [className])}></div>;
});
