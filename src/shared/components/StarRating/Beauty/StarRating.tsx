import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface StarRatingBeautyProps {
	className?: string;
}

export const StarRating = memo((props: StarRatingBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.starRating, {}, [className])}></div>;
});

const StarRatingAsync = (props: StarRatingBeautyProps) => {
	const { isLoaded, StarRating } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <StarRating {...props} />;
};

export const StarRatingBeauty = (props: StarRatingBeautyProps) => {
	return (
		<BeautySharedProvider>
			<StarRatingAsync {...props} />
		</BeautySharedProvider>
	);
};
