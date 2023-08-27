import { FC, lazy } from 'react';
import { NotificationItemProps } from './NotificationItem';

const NotificationItemAsync = lazy<FC<NotificationItemProps>>(() =>
	import('./NotificationItem').then((module) => ({ default: module.NotificationItem }))
);

export { NotificationItemAsync as NotificationItemBeauty };
