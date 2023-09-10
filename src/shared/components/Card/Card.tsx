import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { CardBeautyProps, CardBeauty } from './Beauty/Card';
import { CardMatrixProps, CardMatrix } from './Matrix/Card';

export type CardProps = CardMatrixProps | CardBeautyProps;
export const Card = memo((props: CardProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<CardBeauty {...(props as CardBeautyProps)} />}
			off={<CardMatrix {...(props as CardMatrixProps)} />}
		/>
	);
});
