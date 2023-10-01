import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Icon } from '@/shared/components/Icon';
import { useStarRating } from '../lib/hooks/useStarRating';

export interface StarRatingBeautyProps {
	className?: string;
	onSelect?: (starsCount: number) => void;
	size?: number;
	selectedStars?: number;
}

export const StarRating = memo((props: StarRatingBeautyProps) => {
	const { className, size = 30, selectedStars = 0, onSelect } = props;
	const { currentStarsCount, isSelected, onClick, onHover, onLeave, stars } = useStarRating(
		selectedStars,
		onSelect
	);

	return (
		<div className={classNames(cls.starRating, {}, [className])}>
			{stars.map((starNumber) => (
				<Icon
					className={classNames(
						cls.starRating,
						{
							[cls.hovered]: currentStarsCount >= starNumber,
							[cls.normal]: currentStarsCount < starNumber,
							[cls.selected]: isSelected,
						},
						[]
					)}
					clickable={!isSelected}
					Svg={StarIcon}
					key={starNumber}
					width={size}
					height={size}
					onMouseEnter={onHover(starNumber)}
					onMouseLeave={onLeave}
					onClick={onClick(starNumber)}
				/>
			))}
		</div>
	);
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
