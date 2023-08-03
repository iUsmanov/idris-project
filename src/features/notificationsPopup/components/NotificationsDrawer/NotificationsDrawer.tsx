import { memo } from 'react';
import cls from './NotificationsDrawer.module.scss';
import { NotificationsList } from '@/entities/Notification';
import { Icon } from '@/shared/components/Icon/Icon';
import { Button } from '@/shared/components/Button/Button';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { Modal } from '@/shared/components/Modal/Modal';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { classNames } from '@/shared/lib/classNames/classNames';

interface NotificationsDrawerProps {
	className?: string;
}

export const NotificationsDrawer = memo((props: NotificationsDrawerProps) => {
	const { className } = props;
	const { isMounted, isOpened, onMountAndOpen, onUnmountAndClose } = useModal();

	return (
		<>
			<Button variant='clear' onClick={onMountAndOpen}>
				<Icon Svg={NotificationIcon} variant='inverted' />
			</Button>
			<Modal
				container={document.body}
				isDrawer={true}
				isMounted={isMounted}
				isOpened={isOpened}
				onModalClose={onUnmountAndClose}
			>
				<NotificationsList className={classNames(cls.mobileNotifications, {}, [className])} />
			</Modal>
		</>
	);
});
