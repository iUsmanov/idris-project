import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen, waitFor } from '@testing-library/react';
import { AppRouter } from './AppRouter';
import {
	getRouteAbout,
	getRouteAdminPanel,
	getRouteMain,
	getRouteNotFound,
	getRouteProfile,
} from '@/shared/const/router';

describe('AppRouter.test', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: jest.fn(), // Deprecated
				removeListener: jest.fn(), // Deprecated
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});
	});

	test('Страница должна отрендериться', async () => {
		componentRender(<AppRouter />, {
			route: getRouteAbout(),
		});

		const page = await screen.findByTestId('AboutPage');
		expect(page).toBeInTheDocument();
	});

	test('Главная Страница', async () => {
		componentRender(<AppRouter />, {
			route: getRouteMain(),
		});

		const page = await screen.findByTestId('MainPage');
		expect(page).toBeInTheDocument();
	});

	test('Страница не найдена', async () => {
		componentRender(<AppRouter />, {
			route: getRouteNotFound(),
		});

		const page = await screen.findByTestId('NotFoundPage');
		expect(page).toBeInTheDocument();
	});

	test('Редирект на NotFoundPage', async () => {
		componentRender(<AppRouter />, {
			route: '/some-non-existent-route',
		});

		const page = await screen.findByTestId('NotFoundPage');
		expect(page).toBeInTheDocument();
	});

	test('Редирект неавторизованного пользователя на ForbiddenPage', async () => {
		componentRender(<AppRouter />, {
			route: getRouteProfile('1'),
		});

		const page = await screen.findByTestId('ForbiddenPage');
		expect(page).toBeInTheDocument();
	});

	test('Авторизованный юзер имеет доступ к странице только для авторизованных', async () => {
		componentRender(<AppRouter />, {
			route: getRouteProfile('1'),
			initialState: {
				user: {
					authData: {},
				},
			},
		});
		let page!: HTMLElement;
		await waitFor(() => {
			page = screen.getByTestId('ProfilePage');
		});
		await waitFor(() => {
			expect(page).toBeInTheDocument();
		});
	});

	test('Редирект пользователя, не имеющего нужную роль, на ForbiddenPage', async () => {
		componentRender(<AppRouter />, {
			route: getRouteAdminPanel(),
			initialState: {
				user: {
					authData: {},
				},
			},
		});

		const page = await screen.findByTestId('ForbiddenPage');
		expect(page).toBeInTheDocument();
	});

	test('Пользователь имеет роль для доступа к привелигированной странице', async () => {
		componentRender(<AppRouter />, {
			route: getRouteAdminPanel(),
			initialState: {
				user: {
					authData: {
						roles: ['ADMIN'],
					},
				},
			},
		});

		const page = await screen.findByTestId('AdminPanelPage');
		expect(page).toBeInTheDocument();
	});
});
