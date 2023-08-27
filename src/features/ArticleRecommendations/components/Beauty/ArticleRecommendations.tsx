import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRecommendations.module.scss';

export interface ArticleRecommendationsProps {
	className?: string;
}

export const ArticleRecommendations = memo((props: ArticleRecommendationsProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articleRecommendations, {}, [className])}></div>;
});
