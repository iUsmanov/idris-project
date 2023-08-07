import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import {
	articleCommentsListReducer,
	getArticleCommentsList,
} from '../model/slice/articleCommentsListSlice';
import { CommentsList } from '@/entities/Comment';
import { useSelector } from 'react-redux';

import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleCommentsByArticleId } from '../model/services/fetchArticleCommentsByArticleId/fetchArticleCommentsByArticleId';
import { useParams } from 'react-router-dom';
import { AddNewComment } from '@/entities/AddNewComment';
import { Text } from '@/shared/components/Text';
import { sendArticleComment } from '../model/services/sendArticleComment/sendArticleComment';
import {
	getArticleCommentsListCommentsError,
	getArticleCommentsListIsCommentsLoading,
	getArticleCommentsListIsSendLoading,
	getArticleCommentsListSendError,
} from '../model/selectors/getArticleCommentsList';

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
	const isCommentsLoading = useSelector(getArticleCommentsListIsCommentsLoading);
	const isSendLoading = useSelector(getArticleCommentsListIsSendLoading);
	const commentsError = useSelector(getArticleCommentsListCommentsError);
	const sendError = useSelector(getArticleCommentsListSendError);
	const { id } = useParams<{ id: string }>();

	useDynamicModule({ reducers });

	useInitialEffect(() => {
		dispatch(fetchArticleCommentsByArticleId(id));
	});

	const sendNewComment = useCallback(
		(text: string) => {
			if (!id) return;
			dispatch(sendArticleComment({ articleId: id, text }));
		},
		[dispatch, id]
	);

	return (
		<>
			<Text title={t('Комментарии')} size='size_l' />
			{!commentsError && (
				<AddNewComment
					sendNewComment={sendNewComment}
					isLoading={isSendLoading}
					error={sendError}
				/>
			)}
			<CommentsList comments={comments} isLoading={isCommentsLoading} error={commentsError} />
		</>
	);
});
