import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentsList.module.scss';

export interface CommentsListProps {
	className?: string;
}

export const CommentsList = memo((props: CommentsListProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.commentsList, {}, [className])}></div>;
});
