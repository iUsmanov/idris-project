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
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/featureFlags';
import { MainLayout } from '@/shared/layouts';

export const App = memo(() => {
	const dispatch = useAppDispatch();
	const inited = useSelector(getUserInited);

	useEffect(() => {
		dispatch(initAuthData());
	}, [dispatch]);

	toggleFeatures({
		name: 'isBeautyDesign',
		on: () => document.body.classList.add('beauty-design'),
		off: () => console.log('DELETE ME'),
	});

	if (!inited) {
		return <PageLoader />;
	}

	return (
		<div className={'app'}>
			<ToggleFeatures
				name='isBeautyDesign'
				on={
					<MainLayout
						content={<AppRouter />}
						header={<Navbar />}
						sidebar={<Sidebar />}
						toolbar={<div>7003849</div>}
					/>
				}
				off={
					<>
						<Navbar />
						<HStack>
							<Sidebar />
							<AppRouter />
						</HStack>
					</>
				}
			/>
		</div>
	);
});

// 	return (
// 		<div className={'app'}>
// 			<Navbar />
// 			<HStack>
// 				<Sidebar />
// 				<AppRouter />
// 			</HStack>
// 		</div>
// 	);
