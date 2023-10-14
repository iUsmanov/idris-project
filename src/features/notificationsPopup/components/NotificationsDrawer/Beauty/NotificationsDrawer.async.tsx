import { FC, lazy } from 'react';
import { NotificationsDrawerProps } from './NotificationsDrawer';

const NotificationsDrawerAsync = lazy<FC<NotificationsDrawerProps>>(() =>
	import('./NotificationsDrawer').then((module) => ({ default: module.NotificationsDrawer }))
);

export { NotificationsDrawerAsync as NotificationsDrawerBeauty };
