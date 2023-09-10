import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Icon } from '@/shared/components/Icon';

export interface StarRatingMatrixProps {
	className?: string;
	onSelect?: (starsCount: number) => void;
	size?: number;
	selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingMatrixProps) => {
	const { className, size = 30, selectedStars = 0, onSelect } = props;
	const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
	const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

	const onHover = useCallback(
		(starsCount: number) => () => {
			if (!isSelected) {
				setCurrentStarsCount(starsCount);
			}
		},
		[isSelected]
	);

	const onLeave = useCallback(() => {
		if (!isSelected) {
			setCurrentStarsCount(0);
		}
	}, [isSelected]);

	const onClick = useCallback(
		(starsCount: number) => () => {
			if (!isSelected) {
				onSelect?.(starsCount);
				setCurrentStarsCount(starsCount);
				setIsSelected(true);
			}
		},
		[isSelected, onSelect]
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

const StarRatingAsync = (props: StarRatingMatrixProps) => {
	const { isLoaded, StarRating } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <StarRating {...props} />;
};

export const StarRatingMatrix = (props: StarRatingMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<StarRatingAsync {...props} />
		</MatrixSharedProvider>
	);
};
