import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { PageLoader } from './PageLoader';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

describe('PageLoader.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Component is rendered with sidebar', async () => {
		await componentRender(<PageLoader />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('PageLoader')).toBeInTheDocument();
		expect(screen.getAllByTestId('Skeleton')).toHaveLength(8);
	});
	test('Component is rendered without sidebar', async () => {
		await componentRender(<PageLoader hasSidebar={false} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('PageLoader')).toBeInTheDocument();
		expect(screen.getAllByTestId('Skeleton')).toHaveLength(7);
	});
});
