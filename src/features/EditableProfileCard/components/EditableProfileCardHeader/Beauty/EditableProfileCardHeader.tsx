import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './EditableProfileCardHeader.module.scss';

export interface EditableProfileCardHeaderProps {
	className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.editableProfileCardHeader, {}, [className])}></div>;
});
