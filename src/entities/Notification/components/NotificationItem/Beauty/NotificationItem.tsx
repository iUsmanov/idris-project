import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';

export interface NotificationItemProps {
	className?: string;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.notificationItem, {}, [className])}></div>;
});
