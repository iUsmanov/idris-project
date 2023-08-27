import { FC, lazy } from 'react';
import { NotificationsListProps } from './NotificationsList';

const NotificationsListAsync = lazy<FC<NotificationsListProps>>(() =>
	import('./NotificationsList').then((module) => ({ default: module.NotificationsList }))
);

export { NotificationsListAsync as NotificationsListBeauty };
