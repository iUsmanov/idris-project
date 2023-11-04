// #router
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { PageLoader } from '@/widgets/PageLoader';
import { Suspense, memo } from 'react';
import { Outlet } from 'react-router-dom';

export const AppRouter = memo(() => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={
				<Suspense fallback={<PageLoader hasSidebar={false} />}>
					<Outlet />
				</Suspense>
			}
			off={
				<Suspense fallback={<PageLoader />}>
					<Outlet />
				</Suspense>
			}
		/>
	);
});
