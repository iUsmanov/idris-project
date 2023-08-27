import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CountrySelect.module.scss';

export interface CountrySelectProps {
	className?: string;
}

export const CountrySelect = memo((props: CountrySelectProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.countrySelect, {}, [className])}></div>;
});
