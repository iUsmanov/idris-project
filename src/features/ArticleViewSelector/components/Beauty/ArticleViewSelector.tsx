import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewSelector.module.scss';

export interface ArticleViewSelectorProps {
	className?: string;
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articleViewSelector, {}, [className])}></div>;
});
