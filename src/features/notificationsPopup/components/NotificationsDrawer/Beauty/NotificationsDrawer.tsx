import { memo } from 'react';
import cls from './NotificationsDrawer.module.scss';
import { NotificationsList } from '@/entities/Notification';
import { Icon } from '@/shared/components/Icon';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Drawer } from '@/shared/components/Drawer';

export interface NotificationsDrawerProps {
	className?: string;
}

export const NotificationsDrawer = memo((props: NotificationsDrawerProps) => {
	const { className } = props;
	const { isMounted, isOpened, onMountAndOpen, onUnmountAndClose } = useModal();

	return (
		<>
			<Icon width={36} height={36} Svg={NotificationIcon} clickable onClick={onMountAndOpen} />
			<Drawer
				container={document.body}
				isMounted={isMounted}
				isOpened={isOpened}
				onDrawerClose={onUnmountAndClose}
			>
				<NotificationsList className={classNames(cls.mobileNotifications, {}, [className])} />
			</Drawer>
		</>
	);
});
