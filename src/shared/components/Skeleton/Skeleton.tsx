import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { SkeletonBeautyProps, SkeletonBeauty } from './Beauty/Skeleton';
import { SkeletonMatrixProps, SkeletonMatrix } from './Matrix/Skeleton';

export type SkeletonProps = SkeletonMatrixProps | SkeletonBeautyProps;
export const Skeleton = memo((props: SkeletonProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<SkeletonBeauty {...(props as SkeletonBeautyProps)} />}
			off={<SkeletonMatrix {...(props as SkeletonMatrixProps)} />}
		/>
	);
});
