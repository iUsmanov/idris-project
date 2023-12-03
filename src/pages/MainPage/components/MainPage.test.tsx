import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { MainPage } from './MainPage';

describe('MainPage.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<MainPage />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('MainPage')).toBeInTheDocument();
	});
});
