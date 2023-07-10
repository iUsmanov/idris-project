import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleComments.module.scss';
import { Text } from '@/shared/components/Text/Text';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { sendArticleComment } from '../model/services/sendArticleComment/sendArticleComment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { articleCommentsReducer } from '../model/slice/articleCommentsSlice';
import { AddNewComment } from '@/entities/AddNewComment';

interface ArticleCommentsProps {
	className?: string;
}

const reducers: ReducersList = {
	articleComments: articleCommentsReducer,
};

export const ArticleComments = memo((props: ArticleCommentsProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	useDynamicModule({ reducers });

	const sendNewComment = useCallback(
		(text: string) => {
			dispatch(sendArticleComment(text));
		},
		[dispatch]
	);

	return (
		<>
			<Text title={t('Комментарии')} size='size_l' />
			<AddNewComment sendNewComment={sendNewComment} />
			<ArticleCommentsList />
		</>
	);
});
