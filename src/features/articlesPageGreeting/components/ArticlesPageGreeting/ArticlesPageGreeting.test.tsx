// TODO Я всё-таки не смог протестировать вызов асинк-санка `saveUserSettings`.
// TODO Так же следовало это сделать в файлах ArticleCommentsList&ArticleDetails.test.tsx
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticlesPageGreeting } from './ArticlesPageGreeting';
import { screen } from '@testing-library/react';

const mockDispatch = jest.fn();
const mockSaveUserSettings = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

describe('ArticlesPageGreeting.test', () => {
	jest.mock('@/entities/User', () => ({
		...jest.requireActual('@/entities/User'),
		saveUserSettings: mockSaveUserSettings,
	}));

	test('Desktop-Component is rendered', async () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: false,
		}));
		await componentRender(<ArticlesPageGreeting />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: {
						jsonSettings: {
							isArticlesPageWasOpened: false,
						},
					},
				},
			},
		});
		expect(mockDispatch).toHaveBeenCalled();
		// expect(mockSaveUserSettings).toHaveBeenCalled();
		expect(screen.getByTestId('Modal')).toBeInTheDocument();
		expect(screen.getByText('Добро пожаловать на страницу статей!')).toBeInTheDocument();
		expect(screen.getByText('Здесь можно смотреть статьи на различные темы')).toBeInTheDocument();
	});

	test('Mobile-Component is rendered', async () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: true,
		}));
		await componentRender(<ArticlesPageGreeting />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: {
						jsonSettings: {
							isArticlesPageWasOpened: false,
						},
					},
				},
			},
		});
		expect(mockDispatch).toHaveBeenCalled();
		// expect(mockSaveUserSettings).toHaveBeenCalled();

		expect(screen.getByTestId('Drawer')).toBeInTheDocument();
		expect(screen.getByText('Добро пожаловать на страницу статей!')).toBeInTheDocument();
		expect(screen.getByText('Здесь можно смотреть статьи на различные темы')).toBeInTheDocument();
	});

	test('Desktop-Component is rendered', async () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: false,
		}));
		await componentRender(<ArticlesPageGreeting />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: {
						jsonSettings: {
							isArticlesPageWasOpened: true,
						},
					},
				},
			},
		});

		expect(screen.queryByTestId('Modal')).toBeNull();
		expect(screen.queryByText('Добро пожаловать на страницу статей!')).toBeNull();
		expect(screen.queryByText('Здесь можно смотреть статьи на различные темы')).toBeNull();
	});
});
