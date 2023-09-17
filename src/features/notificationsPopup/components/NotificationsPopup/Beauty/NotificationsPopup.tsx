import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationsPopup.module.scss';
import { Popover } from '@/shared/components/Popups';
import { NotificationsList } from '@/entities/Notification';
import { Icon } from '@/shared/components/Icon';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { DesktopView, MobileView } from '@/shared/components/DeviceViews';
import { NotificationsDrawer } from '../../NotificationsDrawer/NotificationsDrawer';

interface NotificationsPopupProps {
	className?: string;
}

export const NotificationsPopup = memo((props: NotificationsPopupProps) => {
	const { className } = props;

	return (
		<>
			<DesktopView>
				<Popover
					className={classNames(cls.notificationsPopup, {}, [className])}
					trigger={<Icon width={36} height={36} Svg={NotificationIcon} clickable />}
				>
					<NotificationsList className={cls.desktopNotifications} />
				</Popover>
			</DesktopView>
			<MobileView>
				<NotificationsDrawer />
			</MobileView>
		</>
	);
});
