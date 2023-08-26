import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationsList.module.scss';
import { useGetNotificationsQuery } from '../../api/notificationsApi';
import { VStack } from '@/shared/components/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from '@/shared/components/Skeleton';

interface NotificationsListProps {
	className?: string;
}

export const NotificationsList = memo((props: NotificationsListProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const { data, isLoading, error } = useGetNotificationsQuery(null, {
		pollingInterval: 5000,
	});

	if (isLoading) {
		return (
			<VStack gap='16' max className={classNames(cls.notificationsList, {}, [className])}>
				<Skeleton width={'100%'} borderRadius='8px' height={'80px'} />
				<Skeleton width={'100%'} borderRadius='8px' height={'80px'} />
				<Skeleton width={'100%'} borderRadius='8px' height={'80px'} />
			</VStack>
		);
	}

	return (
		<VStack gap='16' max className={classNames(cls.notificationsList, {}, [className])}>
			{data?.map((item) => <NotificationItem key={item.id} item={item} />)}
		</VStack>
	);
});
