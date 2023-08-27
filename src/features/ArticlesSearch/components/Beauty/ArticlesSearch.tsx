import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesSearch.module.scss';

export interface ArticlesSearchProps {
	className?: string;
}

export const ArticlesSearch = memo((props: ArticlesSearchProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.articlesSearch, {}, [className])}></div>;
});
