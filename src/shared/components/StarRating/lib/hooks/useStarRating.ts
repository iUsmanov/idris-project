import { useCallback, useMemo, useState } from 'react';

export function useStarRating(selectedStars: number, onSelect?: (starsCount: number) => void) {
	const stars = useMemo(() => [1, 2, 3, 4, 5], []);
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

	return {
		stars,
		currentStarsCount,
		isSelected,
		onHover,
		onLeave,
		onClick,
	};
}
