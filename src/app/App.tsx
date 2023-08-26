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
import { toggleFeatures } from '@/shared/lib/featureFlags';

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

	// return (
	// 	<ToggleFeatures
	// 		name='isBeautyDesign'
	// 		on={
	// 			<div className={'app'}>
	// 				<Navbar />
	// 				<HStack>
	// 					<Sidebar />
	// 					<AppRouter />
	// 				</HStack>
	// 			</div>
	// 		}
	// 		off={
	// 			<div className={'app'}>
	// 				<Navbar />
	// 				<HStack>
	// 					<Sidebar />
	// 					<AppRouter />
	// 				</HStack>
	// 			</div>
	// 		}
	// 	/>
	// );

	return (
		<div className={'app'}>
			<Navbar />
			<HStack>
				<Sidebar />
				<AppRouter />
			</HStack>
		</div>
	);
});
