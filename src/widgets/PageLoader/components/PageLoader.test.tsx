import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { PageLoader } from './PageLoader';

describe('PageLoader.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<PageLoader />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('PageLoader')).toBeInTheDocument();
		expect(screen.getByTestId('Loader')).toHaveClass('max');
	});
});
