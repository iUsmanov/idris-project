import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { PopoverBeautyProps, PopoverBeauty } from './Beauty/Popover';
import { PopoverMatrixProps, PopoverMatrix } from './Matrix/Popover';

export type PopoverProps = PopoverMatrixProps | PopoverBeautyProps;
export const Popover = memo((props: PopoverProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<PopoverBeauty {...(props as PopoverBeautyProps)} />}
			off={<PopoverMatrix {...(props as PopoverMatrixProps)} />}
		/>
	);
});
