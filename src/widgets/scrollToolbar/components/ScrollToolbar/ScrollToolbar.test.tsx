import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ScrollToolbar } from './ScrollToolbar';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

describe('ScrollToolbar.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Component is rendered', async () => {
		await componentRender(<ScrollToolbar />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ScrollToolbar')).toBeInTheDocument();
		expect(screen.getByTestId('ScrollToTopButton')).toBeInTheDocument();
	});
});
