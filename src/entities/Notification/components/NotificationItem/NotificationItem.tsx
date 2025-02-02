import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { Card } from '@/shared/components/Card';
import { Text } from '@/shared/components/Text';
import { NotificationItemBeauty } from './Beauty/NotificationItem.async';
import { ToggleFeatures } from '@/shared/lib/featureFlags';

interface NotificationItemProps {
	className?: string;
	item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
	const { className, item } = props;

	const content = (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<NotificationItemBeauty {...props} />}
			off={
				<Card
					variant='outline'
					className={classNames(cls.notificationItem, {}, [className])}
					data-testid='NotificationItem'
				>
					<Text title={item.title} text={item.description} tags={['h4']} />
				</Card>
			}
		/>
	);

	if (item.href) {
		return (
			<ToggleFeatures
				name='isBeautyDesign'
				on={content}
				off={
					<a
						className={cls.link}
						target='_blank'
						href={item.href}
						rel='noreferrer'
						data-testid='Link'
					>
						{content}
					</a>
				}
			/>
		);
	}

	return content;
});
