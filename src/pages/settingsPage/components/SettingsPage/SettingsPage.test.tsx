import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { SettingsPage } from './SettingsPage';

describe('SettingsPage.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<SettingsPage />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('SettingsPage')).toBeInTheDocument();
		expect(screen.getByTestId('UIDesignSwitcher')).toBeInTheDocument();
		expect(screen.getByText('Настройки пользователя')).toBeInTheDocument();
	});
});
