import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { AppLinkBeautyProps, AppLinkBeauty } from './Beauty/AppLink';
import { AppLinkMatrixProps, AppLinkMatrix } from './Matrix/AppLink';

export type AppLinkProps = AppLinkMatrixProps | AppLinkBeautyProps;
export const AppLink = memo((props: AppLinkProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<AppLinkBeauty {...(props as AppLinkBeautyProps)} />}
			off={<AppLinkMatrix {...(props as AppLinkMatrixProps)} />}
		/>
	);
});
