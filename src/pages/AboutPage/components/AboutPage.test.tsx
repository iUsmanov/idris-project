import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { AboutPage } from './AboutPage';

describe('AboutPage.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<AboutPage />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('AboutPage')).toBeInTheDocument();
	});
});
