import { screen, waitFor } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { App } from '../App';
import { userEvent } from '@testing-library/user-event';
import { mockUser } from '@/entities/User/testing';
import { act } from 'react-dom/test-utils';
import { articlesInfiniteListReducer } from '@/widgets/articlesInfiniteList/testing';
import { mockArticles, mockArticlesEntities } from '@/entities/Article/testing';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Suspense } from 'react';

window.matchMedia = jest.fn().mockImplementation((query) => ({}));

const component = (
	<Suspense>
		<App />
	</Suspense>
);

describe('App.test', () => {
	test('Component is rendered', async () => {
		await componentRender(component, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('App')).toBeInTheDocument();
		expect(screen.getByTestId('Navbar')).toBeInTheDocument();
		expect(screen.getByTestId('Sidebar')).toBeInTheDocument();
		expect(screen.getByTestId('MainPage')).toBeInTheDocument();
	});

	test('Routing', async () => {
		const { container } = await componentRender(component, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
				articlesInfiniteList: {
					ids: mockArticlesEntities.ids,
					entities: mockArticlesEntities.entities,
					view: 'TILE',
				},
			},
			asyncReducers: {
				articlesInfiniteList: articlesInfiniteListReducer,
			},
		});

		await userEvent.click(screen.getByText('О сайте'));
		expect(screen.getByTestId('AboutPage')).toBeInTheDocument();

		await userEvent.click(screen.getByText('Профиль'));
		waitFor(() => {
			expect(screen.getByTestId('ProfilePage')).toBeInTheDocument();
		});

		act(() => {
			userEvent.click(screen.getByText('Статьи'));
		});
		waitFor(() => {
			expect(screen.getByTestId('ArticlesPage')).toBeInTheDocument();
		});

		act(() => {
			userEvent.click(
				container.querySelector(`[href="${getRouteArticleDetails(mockArticles[0].id)}"]`)!
			);
		});
		waitFor(() => {
			expect(screen.getByTestId('ArticleDetailsPage')).toBeInTheDocument();
		});
		// Можно также продолжить переходить по остальным страницам, кроме SettingsPage и AdminPanelPage,
		// так как переход по ним возможен только с использванием Dropdown/Listbox(headlessUI)
		// которые нельзя регулировать в jest.
	});
});
