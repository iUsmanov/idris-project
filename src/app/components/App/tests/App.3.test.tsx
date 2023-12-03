import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { App } from '../App';
import { setFeatureFlags } from '@/shared/lib/featureFlags';
import { Suspense } from 'react';
import { getRouteAbout } from '@/shared/const/router';

setFeatureFlags({ isBeautyDesign: true });

describe('App.test Beauty', () => {
	test('Testing toolbar', async () => {
		await componentRender(
			<Suspense>
				<App />
			</Suspense>,
			{
				wrapInAct: true,
			}
		);

		expect(document.body).toHaveClass('beauty-design app-light-theme');
		expect(screen.getByTestId('App')).toBeInTheDocument();
		expect(screen.getByTestId('Navbar')).toBeInTheDocument();
		expect(screen.getByTestId('Sidebar')).toBeInTheDocument();
		expect(screen.getByTestId('MainPage')).toBeInTheDocument();
		expect(screen.getByText('MAINTOOLBAR')).toBeInTheDocument();
	});
	test('Testing toolbar', async () => {
		await componentRender(
			<Suspense>
				<App />
			</Suspense>,
			{
				wrapInAct: true,
				route: getRouteAbout(),
			}
		);

		expect(screen.getByText('ABOUTTOOLBAR')).toBeInTheDocument();
	});
});
