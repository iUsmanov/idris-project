import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { StarRatingBeautyProps, StarRatingBeauty } from './Beauty/StarRating';
import { StarRatingMatrixProps, StarRatingMatrix } from './Matrix/StarRating';

export type StarRatingProps = StarRatingMatrixProps | StarRatingBeautyProps;
export const StarRating = memo((props: StarRatingProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<StarRatingBeauty {...(props as StarRatingBeautyProps)} />}
			off={<StarRatingMatrix {...(props as StarRatingMatrixProps)} />}
		/>
	);
});
