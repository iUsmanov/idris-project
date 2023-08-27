import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageError.module.scss';

export interface PageErrorProps {
	className?: string;
}

export const PageError = memo((props: PageErrorProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.pageError, {}, [className])}></div>;
});
