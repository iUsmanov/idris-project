import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { IconBeautyProps, IconBeauty } from './Beauty/Icon';
import { IconMatrixProps, IconMatrix } from './Matrix/Icon';

export type IconProps = IconMatrixProps | IconBeautyProps;
export const Icon = memo((props: IconProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<IconBeauty {...(props as IconBeautyProps)} />}
			off={<IconMatrix {...(props as IconMatrixProps)} />}
		/>
	);
});
