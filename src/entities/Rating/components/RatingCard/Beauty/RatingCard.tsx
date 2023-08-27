import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';

export interface RatingCardProps {
	className?: string;
}

export const RatingCard = memo((props: RatingCardProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.ratingCard, {}, [className])}></div>;
});
