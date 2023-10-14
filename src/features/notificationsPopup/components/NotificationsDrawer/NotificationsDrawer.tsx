import { memo } from 'react';
import cls from './NotificationsDrawer.module.scss';
import { NotificationsList } from '@/entities/Notification';
import { Icon } from '@/shared/components/Icon';
import { Button } from '@/shared/components/Button';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Drawer } from '@/shared/components/Drawer';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { NotificationsDrawerBeauty } from './Beauty/NotificationsDrawer.async';

interface NotificationsDrawerProps {
	className?: string;
}

export const NotificationsDrawer = memo((props: NotificationsDrawerProps) => {
	const { className } = props;
	const { isMounted, isOpened, onMountAndOpen, onUnmountAndClose } = useModal();

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<NotificationsDrawerBeauty {...props} />}
			off={
				<>
					<Button variant='clear' onClick={onMountAndOpen}>
						<Icon Svg={NotificationIcon} variant='inverted' />
					</Button>
					<Drawer
						container={document.body}
						isMounted={isMounted}
						isOpened={isOpened}
						onDrawerClose={onUnmountAndClose}
					>
						<NotificationsList className={classNames(cls.mobileNotifications, {}, [className])} />
					</Drawer>
				</>
			}
		/>
	);
});
