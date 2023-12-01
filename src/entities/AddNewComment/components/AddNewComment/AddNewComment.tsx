import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddNewComment.module.scss';
import { HStack } from '@/shared/components/Stack';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { Text } from '@/shared/components/Text';
import { useAddNewComment } from '../../lib/hooks/useAddNewComment';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { AddNewCommentBeauty } from './Beauty/AddNewComment.async';

export interface AddNewCommentProps {
	className?: string;
	sendNewComment: (text: string) => void;
	isLoading?: boolean;
	error?: string;
}

export const AddNewComment = memo((props: AddNewCommentProps) => {
	const { className, sendNewComment, error, isLoading } = props;
	const { t } = useTranslation(['article-details', 'translation']);
	const { onChangeText, onSendNewComment, text } = useAddNewComment(sendNewComment);

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<AddNewCommentBeauty {...props} />}
			off={
				<>
					{error && <Text variant='error' title={t('Произошла непредвиденная ошибка')} />}
					<HStack
						max
						justify='between'
						align='center'
						className={classNames(cls.addNewComment, {}, [className])}
						data-testid='AddNewComment'
					>
						<Input
							className={cls.input}
							placeholder={t('Введите текст комментария')}
							value={text}
							onChange={onChangeText}
							disabled={isLoading}
						/>
						<Button variant='outline' onClick={onSendNewComment} disabled={isLoading}>
							{t('Отправить')}
						</Button>
					</HStack>
				</>
			}
		/>
	);
});
