import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ButtonBeautyProps, ButtonBeauty } from './Beauty/Button';
import { ButtonMatrixProps, ButtonMatrix } from './Matrix/Button';

type ButtonProps = ButtonMatrixProps | ButtonBeautyProps;
export const Button = memo((props: ButtonProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ButtonBeauty {...(props as ButtonBeautyProps)} />}
			off={<ButtonMatrix {...(props as ButtonMatrixProps)} />}
		/>
	);
});
