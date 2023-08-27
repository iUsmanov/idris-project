import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AvatarDropdown.module.scss';

export interface AvatarDropdownProps {
	className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.avatarDropdown, {}, [className])}></div>;
});
