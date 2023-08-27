import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationsDrawer.module.scss';

export interface NotificationsDrawerProps {
	className?: string;
}

export const NotificationsDrawer = memo((props: NotificationsDrawerProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.notificationsDrawer, {}, [className])}></div>;
});
