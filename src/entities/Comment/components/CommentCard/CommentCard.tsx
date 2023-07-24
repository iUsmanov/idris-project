import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { HStack, VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text/Text';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { AppLink } from '@/shared/components/AppLink/AppLink';
import { getRouteProfile } from '@/shared/const/router';

interface CommentCardProps {
	className?: string;
	comment: Comment;
}

export const CommentCard = memo((props: CommentCardProps) => {
	const { className, comment } = props;
	const { t } = useTranslation();

	return (
		<VStack max gap='8' className={classNames(cls.commentCard, {}, [className])}>
			<AppLink to={getRouteProfile(comment.userId)}>
				<HStack gap='8' align='center' className={cls.header}>
					{comment.user?.avatar ? (
						<Avatar src={comment.user?.avatar} size={30} />
					) : (
						<Text title={comment.userId} size='size_l' />
					)}
					<Text title={comment.userId} size='size_m' className={cls.username} />
				</HStack>
			</AppLink>
			<Text text={comment.text} size='size_m' />
		</VStack>
	);
});
