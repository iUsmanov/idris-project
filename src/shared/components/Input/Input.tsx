import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { InputBeautyProps, InputBeauty } from './Beauty/Input';
import { InputMatrixProps, InputMatrix } from './Matrix/Input';

export type InputProps = InputMatrixProps | InputBeautyProps;
export const Input = memo((props: InputProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<InputBeauty {...(props as InputBeautyProps)} />}
			off={<InputMatrix {...(props as InputMatrixProps)} />}
		/>
	);
});
