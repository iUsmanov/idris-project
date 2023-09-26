import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';

export interface ArticleDetailsProps {
	className?: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articleDetails, {}, [className])}></div>;
});
