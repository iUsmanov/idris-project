import { memo, useEffect } from 'react';
import { AppRouter } from './providers/router/components/AppRouter';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { HStack } from '@/shared/components/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserInited } from '@/entities/User';
import { useSelector } from 'react-redux';
import { initAuthData } from '@/entities/User';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/featureFlags';

export const App = memo(() => {
	const dispatch = useAppDispatch();
	const inited = useSelector(getUserInited);

	useEffect(() => {
		dispatch(initAuthData());
	}, [dispatch]);

	if (!inited) {
		return <PageLoader />;
	}

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={
				<div className={'app app-beauty'}>
					<Navbar />
					<HStack>
						<Sidebar />
						{inited && <AppRouter />}
					</HStack>
				</div>
			}
			off={
				<div className={'app'}>
					<Navbar />
					<HStack>
						<Sidebar />
						{inited && <AppRouter />}
					</HStack>
				</div>
			}
		/>
	);

	// return (
	// 	<div className={'app'}>
	// 		<Navbar />
	// 		<HStack>
	// 			<Sidebar />
	// 			{inited && <AppRouter />}
	// 		</HStack>
	// 	</div>
	// );
});
