import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { Card } from '@/shared/components/Card';
import { Text } from '@/shared/components/Text';
import { Notification } from '../../../model/types/notification';

export interface NotificationItemProps {
	className?: string;
	item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
	const { className, item } = props;

	const content = (
		<Card
			className={classNames(cls.notificationItem, {}, [className])}
			data-testid='NotificationItem'
		>
			<Text title={item.title} text={item.description} tags={['h4']} />
		</Card>
	);

	if (item.href) {
		return (
			<a className={cls.link} target='_blank' href={item.href} rel='noreferrer' data-testid='Link'>
				{content}
			</a>
		);
	}

	return content;
});
