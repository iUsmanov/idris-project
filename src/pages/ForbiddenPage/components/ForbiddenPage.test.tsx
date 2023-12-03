import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ForbiddenPage } from './ForbiddenPage';

describe('ForbiddenPage.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<ForbiddenPage />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ForbiddenPage')).toBeInTheDocument();
	});
});
