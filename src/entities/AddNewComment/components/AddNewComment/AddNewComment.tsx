import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddNewComment.module.scss';
import { HStack } from '@/shared/components/Stack';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import { getAddNewCommentText } from '../../model/selectors/addNewCommentSelectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { Text } from '@/shared/components/Text/Text';

export interface AddNewCommentProps {
	className?: string;
	sendNewComment: (text: string) => void;
	isLoading?: boolean;
	error?: string;
}

const reducers: ReducersList = {
	addNewComment: addNewCommentReducer,
};

export const AddNewComment = memo((props: AddNewCommentProps) => {
	const { className, sendNewComment, error, isLoading } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const text = useSelector(getAddNewCommentText);

	useDynamicModule({ reducers });

	const onChangeText = useCallback(
		(value: string) => {
			dispatch(addNewCommentActions.setText(value));
		},
		[dispatch]
	);

	const onSendNewComment = useCallback(() => {
		sendNewComment(text || '');
		onChangeText('');
	}, [onChangeText, sendNewComment, text]);

	return (
		<>
			{error && <Text variant='error' title={t('Произошла непредвиденная ошибка')} />}
			<HStack
				justify='between'
				align='center'
				className={classNames(cls.addNewComment, {}, [className])}
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
	);
});
