import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCommentsList.module.scss';

export interface ArticleCommentsListProps {
	className?: string;
}

export const ArticleCommentsList = memo((props: ArticleCommentsListProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articleCommentsList, {}, [className])}></div>;
});
