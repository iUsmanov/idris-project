import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddNewComment.module.scss';
import { HStack } from '@/shared/components/Stack';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import {
	getAddNewCommentError,
	getAddNewCommentText,
} from '../../model/selectors/addNewCommentSelectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';

export interface AddNewCommentProps {
	className?: string;
	onSendNewComment: () => void;
}

const reducers: ReducersList = {
	addNewComment: addNewCommentReducer,
};

export const AddNewComment = memo((props: AddNewCommentProps) => {
	const { className, onSendNewComment } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const text = useSelector(getAddNewCommentText);
	const error = useSelector(getAddNewCommentError);

	useDynamicModule({ reducers });

	const onChangeText = useCallback(
		(value: string) => {
			dispatch(addNewCommentActions.setText(value));
		},
		[dispatch]
	);

	return (
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
			/>
			<Button variant='outline' onClick={onSendNewComment}>
				{t('Отправить')}
			</Button>
		</HStack>
	);
});
