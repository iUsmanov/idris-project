import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';

export interface CommentCardProps {
	className?: string;
}

export const CommentCard = memo((props: CommentCardProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.commentCard, {}, [className])}></div>;
});
