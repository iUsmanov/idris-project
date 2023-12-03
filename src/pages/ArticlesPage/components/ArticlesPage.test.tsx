import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticlesPage } from './ArticlesPage';
import { mockUser } from '@/entities/User/testing';
import { articlesInfiniteListReducer } from '@/widgets/articlesInfiniteList/testing';

window.matchMedia = jest.fn().mockImplementation((query) => ({}));
const intersectionObserverMock = () => ({
	observe: () => null,
	unobserve: () => null,
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

describe('ArticlesPage.test', () => {
	test('Component is rendered. Without ArticlesPageGreeting', async () => {
		await componentRender(<ArticlesPage />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
			},
		});

		expect(screen.getByTestId('ArticlesPage')).toBeInTheDocument();
		expect(screen.getByTestId('ArticlesInfiniteList')).toBeInTheDocument();
		expect(screen.queryByText('Добро пожаловать на страницу статей!')).toBeNull();
	});
	test('Component is rendered. With ArticlesPageGreeting', async () => {
		await componentRender(<ArticlesPage />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: {
						...mockUser,
						jsonSettings: {
							isArticlesPageWasOpened: false,
						},
					},
				},
			},
		});

		expect(screen.getByTestId('ArticlesPage')).toBeInTheDocument();
		expect(screen.getByTestId('ArticlesInfiniteList')).toBeInTheDocument();
		expect(screen.getByText('Добро пожаловать на страницу статей!')).toBeInTheDocument();
	});

	test('Component is rendered. Error. Несмотря на то, что юзер ещё не открывал страницу статей ему она не будет показана из-за ошибки', async () => {
		await componentRender(<ArticlesPage />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: {
						...mockUser,
						jsonSettings: {
							isArticlesPageWasOpened: false,
						},
					},
				},
				articlesInfiniteList: {
					ids: [],
					entities: {},
					error: 'error',
				},
			},
			asyncReducers: {
				articlesInfiniteList: articlesInfiniteListReducer,
			},
		});

		expect(screen.queryByText('Добро пожаловать на страницу статей!')).toBeNull();
	});
});
