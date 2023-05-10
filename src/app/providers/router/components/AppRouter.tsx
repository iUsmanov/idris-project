import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

interface AppRouterProps {}

export const AppRouter: FC<AppRouterProps> = (props) => {
	return (
		<Suspense fallback={<h1>Loadinggggg</h1>}>
			<div className='outlet-wrapper'>
				<Outlet />
			</div>
		</Suspense>
	);
};
