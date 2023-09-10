import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { DropdownBeautyProps, DropdownBeauty } from './Beauty/Dropdown';
import { DropdownMatrixProps, DropdownMatrix } from './Matrix/Dropdown';

export type DropdownProps = DropdownMatrixProps | DropdownBeautyProps;
export const Dropdown = memo((props: DropdownProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<DropdownBeauty {...(props as DropdownBeautyProps)} />}
			off={<DropdownMatrix {...(props as DropdownMatrixProps)} />}
		/>
	);
});
