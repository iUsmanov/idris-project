import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../../model/types/comment';
import { HStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { Avatar } from '@/shared/components/Avatar';
import { AppLink } from '@/shared/components/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { Card } from '@/shared/components/Card';

export interface CommentCardProps {
	className?: string;
	comment: Comment;
}

export const CommentCard = memo((props: CommentCardProps) => {
	const { className, comment } = props;
	const { t } = useTranslation();

	return (
		<Card
			flex
			direction='column'
			max
			gap='8'
			padding='24'
			border='high'
			className={classNames('', {}, [className])}
			data-testid='CommentCard'
		>
			<AppLink to={getRouteProfile(comment.userId)}>
				<HStack gap='8' align='center'>
					<Avatar src={comment.user?.avatar} size={30} />
					<Text text={comment.user?.username} size='size_m' bold />
				</HStack>
			</AppLink>
			<Text text={comment.text} size='size_m' />
		</Card>
	);
});
