import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationsPopup.module.scss';
import { Popover } from '@/shared/components/Popups';
import { NotificationsList } from '@/entities/Notification';
import { Icon } from '@/shared/components/Icon';
import { Button } from '@/shared/components/Button';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { DesktopView, MobileView } from '@/shared/components/DeviceViews';
import { NotificationsDrawer } from '../NotificationsDrawer/NotificationsDrawer';
import { NotificationsPopupBeauty } from './Beauty/NotificationsPopup.async';
import { ToggleFeatures } from '@/shared/lib/featureFlags';

interface NotificationsPopupProps {
	className?: string;
}

export const NotificationsPopup = memo((props: NotificationsPopupProps) => {
	const { className } = props;

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<NotificationsPopupBeauty {...props} />}
			off={
				<>
					<DesktopView>
						<Popover
							className={classNames(cls.notificationsPopup, {}, [className])}
							trigger={
								<Button variant='clear'>
									<Icon width={20} height={20} Svg={NotificationIcon} variant='inverted' />
								</Button>
							}
						>
							<NotificationsList className={cls.desktopNotifications} />
						</Popover>
					</DesktopView>
					<MobileView>
						<NotificationsDrawer />
					</MobileView>
				</>
			}
		/>
	);
});
