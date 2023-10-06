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
import { ScrollToolbar } from '@/widgets/scrollToolbar';

export const App = memo(() => {
	const dispatch = useAppDispatch();
	const inited = useSelector(getUserInited);

	const addClassName = (className: 'beauty-design' | 'matrix-design') => {
		const notClassName: string = className === 'beauty-design' ? 'matrix-design' : 'beauty-design';
		if (!document.body.classList.contains(className)) {
			document.body.classList.add(className);
		}

		if (document.body.classList.contains(notClassName)) {
			document.body.classList.remove(notClassName);
		}
	};

	useEffect(() => {
		if (!inited) {
			dispatch(initAuthData());
		}
	}, [dispatch, inited]);

	toggleFeatures({
		name: 'isBeautyDesign',
		on: () => addClassName('beauty-design'),
		off: () => addClassName('matrix-design'),
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
						toolbar={<ScrollToolbar />}
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
