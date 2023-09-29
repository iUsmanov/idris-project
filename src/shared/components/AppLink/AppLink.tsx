import { forwardRef, memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { AppLinkBeautyProps, AppLinkBeauty } from './Beauty/AppLink';
import { AppLinkMatrixProps, AppLinkMatrix } from './Matrix/AppLink';

export type AppLinkProps = AppLinkMatrixProps | AppLinkBeautyProps;
const AppLink = forwardRef((props: AppLinkProps, ref) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<AppLinkBeauty {...(props as AppLinkBeautyProps)} />}
			off={<AppLinkMatrix {...(props as AppLinkMatrixProps)} />}
		/>
	);
});

const MemoizedAppLink = memo(AppLink);

export { MemoizedAppLink as AppLink };
