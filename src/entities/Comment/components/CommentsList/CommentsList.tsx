import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentsList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { Shimmer, ShimmerType } from '@/shared/components/Shimmer/Shimmer';
import { Text } from '@/shared/components/Text/Text';
import { VStack } from '@/shared/components/Stack';

interface CommentsListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
	error?: string;
}

const skeletons: ShimmerType = {
	ver: [
		{
			hor: [
				{ width: 30, height: 30, borderRadius: '50%' },
				{ width: 120, height: 20, margin: 'auto 0', marginLeft: 10 },
			],
		},
		{
			ver: [{ height: 60, marginTop: 20 }],
		},
	],
};

export const CommentsList = memo((props: CommentsListProps) => {
	const { className, comments, error, isLoading } = props;
	const { t } = useTranslation();

	if (isLoading) {
		return (
			<>
				<Shimmer className={cls.skeleton} skeletons={skeletons} />
				<Shimmer className={cls.skeleton} skeletons={skeletons} />
			</>
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
		<VStack max gap='16' className={classNames(cls.commentsList, {}, [className])}>
			{comments?.length ? (
				comments.map((comment) => (
					<CommentCard className={cls.commentCard} key={comment.id} comment={comment} />
				))
			) : (
				<Text size='size_l' text={t('Комментарии отсутствуют')} />
			)}
		</VStack>
	);
});
