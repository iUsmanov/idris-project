import { FC, lazy } from 'react';
import { NotificationsPopupProps } from './NotificationsPopup';

const NotificationsPopupAsync = lazy<FC<NotificationsPopupProps>>(() =>
	import('./NotificationsPopup').then((module) => ({ default: module.NotificationsPopup }))
);

export { NotificationsPopupAsync as NotificationsPopupBeauty };
