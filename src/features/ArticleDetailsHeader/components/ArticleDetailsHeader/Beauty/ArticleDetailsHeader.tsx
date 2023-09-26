import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetailsHeader.module.scss';

export interface ArticleDetailsHeaderProps {
	className?: string;
}

export const ArticleDetailsHeader = memo((props: ArticleDetailsHeaderProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articleDetailsHeader, {}, [className])}></div>;
});
