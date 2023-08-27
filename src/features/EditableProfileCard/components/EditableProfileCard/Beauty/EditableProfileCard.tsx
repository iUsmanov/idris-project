import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './EditableProfileCard.module.scss';

export interface EditableProfileCardProps {
	className?: string;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.editableProfileCard, {}, [className])}></div>;
});
