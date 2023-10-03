import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { HStack, VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { Avatar } from '@/shared/components/Avatar';
import { AppLink } from '@/shared/components/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { CommentCardBeauty } from './Beauty/CommentCard.async';

interface CommentCardProps {
	className?: string;
	comment: Comment;
}

export const CommentCard = memo((props: CommentCardProps) => {
	const { className, comment } = props;
	const { t } = useTranslation();

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<CommentCardBeauty {...props} />}
			off={
				<VStack max gap='8' className={classNames(cls.commentCard, {}, [className])}>
					<AppLink to={getRouteProfile(comment.userId)}>
						<HStack gap='8' align='center'>
							<Avatar src={comment.user?.avatar} size={30} />
							<Text title={comment.user?.username} size='size_m' />
						</HStack>
					</AppLink>
					<Text text={comment.text} size='size_m' />
				</VStack>
			}
		/>
	);
});
