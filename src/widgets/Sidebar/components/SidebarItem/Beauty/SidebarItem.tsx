import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';

export interface SidebarItemProps {
	className?: string;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.sidebarItem, {}, [className])}></div>;
});
