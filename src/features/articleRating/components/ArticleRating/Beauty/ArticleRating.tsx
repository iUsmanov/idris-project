import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRating.module.scss';

export interface ArticleRatingProps {
	className?: string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articleRating, {}, [className])}></div>;
});
