import { useCallback, useMemo } from 'react';
import { getAddNewCommentText } from '../../model/selectors/addNewCommentSelectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';

export function useAddNewComment(sendNewComment: (text: string) => void) {
	const dispatch = useAppDispatch();
	const text = useSelector(getAddNewCommentText);

	const reducers = useMemo<ReducersList>(
		() => ({
			addNewComment: addNewCommentReducer,
		}),
		[]
	);

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

	return {
		text,
		onChangeText,
		onSendNewComment,
	};
}
