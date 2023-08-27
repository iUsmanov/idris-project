import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationsPopup.module.scss';

export interface NotificationsPopupProps {
	className?: string;
}

export const NotificationsPopup = memo((props: NotificationsPopupProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.notificationsPopup, {}, [className])}></div>;
});
