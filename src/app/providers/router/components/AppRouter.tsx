import { PageLoader } from '@/widgets/PageLoader';
import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

interface AppRouterProps {}

export const AppRouter: FC<AppRouterProps> = (props) => {
	return (
		<Suspense fallback={<PageLoader />}>
			<div className='outlet-wrapper'>
				<Outlet />
			</div>
		</Suspense>
	);
};
