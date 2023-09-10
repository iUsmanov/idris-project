import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { CodeBeautyProps, CodeBeauty } from './Beauty/Code';
import { CodeMatrixProps, CodeMatrix } from './Matrix/Code';

export type CodeProps = CodeMatrixProps | CodeBeautyProps;
export const Code = memo((props: CodeProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<CodeBeauty {...(props as CodeBeautyProps)} />}
			off={<CodeMatrix {...(props as CodeMatrixProps)} />}
		/>
	);
});
