import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleComments.module.scss';
import { Text } from '@/shared/components/Text/Text';
import { AddNewComment } from '@/features/AddNewComment';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { sendArticleComment } from '../model/services/sendArticleComment/sendArticleComment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ArticleCommentsProps {
	className?: string;
}

export const ArticleComments = memo((props: ArticleCommentsProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const onSendNewComment = useCallback(() => {
		dispatch(sendArticleComment());
	}, [dispatch]);

	return (
		<>
			<Text title={t('Комментарии')} size='size_l' />
			<AddNewComment onSendNewComment={onSendNewComment} />
			<ArticleCommentsList />
		</>
	);
});
