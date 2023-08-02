import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationsPopup.module.scss';
import { Popover } from '@/shared/components/Popups';
import { NotificationsList } from '@/entities/Notification';
import { Icon } from '@/shared/components/Icon/Icon';
import { Button } from '@/shared/components/Button/Button';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';

interface NotificationsPopupProps {
	className?: string;
}

export const NotificationsPopup = memo((props: NotificationsPopupProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<Popover
			className={classNames(cls.notificationsPopup, {}, [className])}
			trigger={
				<Button variant='clear'>
					<Icon Svg={NotificationIcon} variant='inverted' />
				</Button>
			}
		>
			<NotificationsList className={cls.notifications} />
		</Popover>
	);
});
