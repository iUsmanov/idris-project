import { Notification } from './model/types/notification';

export const mockNotification: Notification = {
	id: '1',
	title: 'Уведомление 1',
	description: 'Произошло какое-то событие',
};

export const mockNotifications: Notification[] = [
	{
		id: '1',
		title: 'Уведомление 1',
		description: 'Произошло какое-то событие',
	},
	{
		id: '2',
		title: 'Уведомление 2',
		description: 'Произошло какое-то событие',
		href: 'http://localhost:3000/admin',
	},
	{
		id: '3',
		title: 'Уведомление 3',
		description: 'Произошло какое-то событие',
		href: 'http://localhost:3000/admin',
	},
	{
		id: '4',
		title: 'Уведомление 4',
		description: 'Произошло какое-то событие',
	},
];
