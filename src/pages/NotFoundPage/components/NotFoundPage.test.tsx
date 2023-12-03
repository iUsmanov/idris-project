import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<NotFoundPage />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('NotFoundPage')).toBeInTheDocument();
	});
});
