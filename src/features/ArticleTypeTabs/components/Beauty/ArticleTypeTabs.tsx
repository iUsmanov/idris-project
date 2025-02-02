import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface ArticleTypeTabsProps {
	className?: string;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames('', {}, [className])}></div>;
});
