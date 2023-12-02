import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Navbar } from './Navbar';
import { userEvent } from '@testing-library/user-event';
import { mockUser } from '@/entities/User/testing';

window.matchMedia = jest.fn().mockImplementation((query) => ({}));

describe('Navbar.test Authed', () => {
	test('Component is rendered', async () => {
		await componentRender(<Navbar />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
			},
		});

		expect(screen.getByTestId('Navbar')).toBeInTheDocument();
		expect(screen.getByTestId('Popover')).toBeInTheDocument();
		expect(screen.getByTestId('AvatarDropdown')).toBeInTheDocument();
		expect(screen.getByText('Создать статью')).toBeInTheDocument();
	});
});

// NO AUTHED
// NO AUTHED
// NO AUTHED
// NO AUTHED
// NO AUTHED

describe('Navbar.test No Authed', () => {
	test('Component is rendered', async () => {
		await componentRender(<Navbar />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('Navbar')).toBeInTheDocument();
		expect(screen.getByText('Войти')).toBeInTheDocument();
		expect(screen.queryByTestId('Modal')).toBeNull();
	});

	test('Authing', async () => {
		await componentRender(<Navbar />, {
			wrapInAct: true,
		});

		await userEvent.click(screen.getByText('Войти'));

		expect(screen.getByTestId('Modal')).toBeInTheDocument();
		expect(screen.getByTestId('LoginForm')).toBeInTheDocument();

		// await userEvent.click(screen.getByText('Войти'))
		// expect().toBeInTheDocument();
	});
});
