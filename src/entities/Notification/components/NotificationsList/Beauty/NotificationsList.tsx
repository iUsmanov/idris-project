import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationsList.module.scss';

export interface NotificationsListProps {
	className?: string;
}

export const NotificationsList = memo((props: NotificationsListProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.notificationsList, {}, [className])}></div>;
});
