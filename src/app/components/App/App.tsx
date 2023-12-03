import { memo } from 'react';
import { AppRouter } from '../../providers/router/components/AppRouter/AppRouter';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { HStack } from '@/shared/components/Stack';
import { getUserInited } from '@/entities/User';
import { useSelector } from 'react-redux';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { MainLayout } from '@/shared/layouts';
import { useAppToolbar } from '../../lib/hooks/useAppToolbar/useAppToolbar';
import { withTheme } from '../../providers/ThemeProvider';
import { useApp } from '../../lib/hooks/useApp/useApp';

const App = memo(() => {
	const inited = useSelector(getUserInited);
	const toolbar = useAppToolbar();
	useApp();

	if (!inited) {
		return <PageLoader />;
	}

	return (
		<div className={'app'} data-testid='App'>
			<ToggleFeatures
				name='isBeautyDesign'
				on={
					<MainLayout
						content={<AppRouter />}
						header={<Navbar />}
						sidebar={<Sidebar />}
						toolbar={toolbar}
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

const AppWithTheme = withTheme(App);
export { AppWithTheme as App };
