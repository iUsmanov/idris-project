import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ProfilePage } from './ProfilePage';
import { getRouteProfile } from '@/shared/const/router';

describe('ProfilePage.test', () => {
	test('Component is rendered. Render non-exist profile', async () => {
		await componentRender(<ProfilePage />, {
			wrapInAct: true,
		});

		expect(screen.getByText('Профиль не найден')).toBeInTheDocument();
		expect(screen.queryByTestId('ProfilePage')).toBeNull();
	});

	test('Component is rendered. Render exist profile', async () => {
		await componentRender(<ProfilePage />, {
			wrapInAct: true,
			route: getRouteProfile('1'),
		});

		expect(screen.getByTestId('ProfilePage')).toBeInTheDocument();
		expect(screen.getByTestId('EditableProfileCard')).toBeInTheDocument();
	});
});
