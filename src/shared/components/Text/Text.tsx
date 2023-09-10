import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { TextBeautyProps, TextBeauty } from './Beauty/Text';
import { TextMatrixProps, TextMatrix } from './Matrix/Text';

export type TextProps = TextMatrixProps | TextBeautyProps;
export const Text = memo((props: TextProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<TextBeauty {...(props as TextBeautyProps)} />}
			off={<TextMatrix {...(props as TextMatrixProps)} />}
		/>
	);
});
