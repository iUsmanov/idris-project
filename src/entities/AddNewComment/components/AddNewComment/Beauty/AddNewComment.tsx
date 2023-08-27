import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddNewComment.module.scss';

export interface AddNewCommentProps {
	className?: string;
}

export const AddNewComment = memo((props: AddNewCommentProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.addNewComment, {}, [className])}></div>;
});
