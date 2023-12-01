import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text } from '@/shared/components/Text';
import { HStack, VStack } from '@/shared/components/Stack';
import { Skeleton } from '@/shared/components/Skeleton';

interface CommentsListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
	error?: string;
}

export const CommentsList = memo((props: CommentsListProps) => {
	const { className, comments, error, isLoading } = props;
	const { t } = useTranslation('article-details');

	if (isLoading) {
		return (
			<VStack max gap='16' data-testid='CommentsList.IsLoading'>
				<VStack max gap='8' className={classNames('', {}, [className])}>
					<HStack gap='8' align='center'>
						<Skeleton width={30} height={30} borderRadius='50%' />
						<Skeleton width={120} height={20} />
					</HStack>
					<Skeleton width={'100%'} height={60} />
				</VStack>
				<VStack max gap='8' className={classNames('', {}, [className])}>
					<HStack gap='8' align='center'>
						<Skeleton width={30} height={30} borderRadius='50%' />
						<Skeleton width={120} height={20} />
					</HStack>
					<Skeleton width={'100%'} height={60} />
				</VStack>
			</VStack>
		);
	}

	if (error) {
		return (
			<Text
				variant='error'
				size='size_l'
				title={t('Произошла непредвиденная ошибка')}
				align='center'
			/>
		);
	}

	return (
		<VStack max gap='16' className={classNames('', {}, [className])} data-testid='CommentsList'>
			{comments?.length ? (
				comments.map((comment) => <CommentCard className={''} key={comment.id} comment={comment} />)
			) : (
				<Text size='size_l' text={t('Комментарии отсутствуют')} />
			)}
		</VStack>
	);
});
