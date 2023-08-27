import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';

export interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.themeSwitcher, {}, [className])}></div>;
});
