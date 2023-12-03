import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { AdminPanelPage } from './AdminPanelPage';

describe('AdminPanelPage.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<AdminPanelPage />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('AdminPanelPage')).toBeInTheDocument();
	});
});
