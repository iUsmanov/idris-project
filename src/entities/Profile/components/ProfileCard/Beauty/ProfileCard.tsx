import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';

export interface ProfileCardProps {
	className?: string;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.profileCard, {}, [className])}></div>;
});
