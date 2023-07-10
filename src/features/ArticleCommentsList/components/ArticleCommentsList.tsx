import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCommentsList.module.scss';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import {
	articleCommentsListReducer,
	getArticleCommentsList,
} from '../model/slice/articleCommentsListSlice';
import { CommentsList } from '@/entities/Comment';
import { useSelector } from 'react-redux';
import {
	getArticleCommentsListError,
	getArticleCommentsListIsLoading,
} from '../model/selectors/getArticleCommentsList';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleCommentsByArticleId } from '../model/services/fetchArticleCommentsByArticleId/fetchArticleCommentsByArticleId';
import { useParams } from 'react-router-dom';
import { getArticleDetailsError } from '@/entities/Article';
import { AddNewComment } from '@/entities/AddNewComment';
import { Text } from '@/shared/components/Text/Text';
import { sendArticleComment } from '../model/services/sendArticleComment/sendArticleComment';

interface ArticleCommentsListProps {
	className?: string;
}

const reducers: ReducersList = {
	articleCommentsList: articleCommentsListReducer,
};

export const ArticleCommentsList = memo((props: ArticleCommentsListProps) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const dispatch = useAppDispatch();
	const comments = useSelector(getArticleCommentsList.selectAll);
	const isLoading = useSelector(getArticleCommentsListIsLoading);
	const error = useSelector(getArticleCommentsListError);
	const articleError = useSelector(getArticleDetailsError);
	const { id } = useParams<{ id: string }>();

	useDynamicModule({ reducers });

	useInitialEffect(() => {
		dispatch(fetchArticleCommentsByArticleId(id));
	});

	const sendNewComment = useCallback(
		(text: string) => {
			dispatch(sendArticleComment(text));
		},
		[dispatch]
	);

	if (articleError) {
		return null;
	}

	return (
		<>
			<Text title={t('Комментарии')} size='size_l' />
			<AddNewComment sendNewComment={sendNewComment} />
			<CommentsList comments={comments} isLoading={isLoading} error={error} />
		</>
	);
});
