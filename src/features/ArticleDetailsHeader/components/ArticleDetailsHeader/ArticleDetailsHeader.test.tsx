import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleDetailsHeader } from './ArticleDetailsHeader';
import { getRouteArticleDetails } from '@/shared/const/router';
import { screen } from '@testing-library/react';
import { articleDetailsReducer } from '@/entities/Article/testing';

describe('ArticleDetailsHeader.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<ArticleDetailsHeader />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
		});

		expect(screen.getByTestId('ArticleDetailsHeader')).toBeInTheDocument();
		expect(screen.getByText('Назад к списку')).toBeInTheDocument();
		expect(screen.queryByText('Редактировать')).toBeNull();
	});

	test('We cannot edit', async () => {
		await componentRender(<ArticleDetailsHeader />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
			initialState: {
				articleDetails: {
					data: {
						userId: '1',
					},
				},
				user: {
					authData: {
						id: '2',
					},
				},
			},
			asyncReducers: {
				articleDetails: articleDetailsReducer,
			},
		});

		expect(screen.getByText('Назад к списку')).toBeInTheDocument();
		expect(screen.queryByText('Редактировать')).toBeNull();
	});

	test('We can edit', async () => {
		await componentRender(<ArticleDetailsHeader />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
			initialState: {
				articleDetails: {
					data: {
						userId: '1',
					},
				},
				user: {
					authData: {
						id: '1',
					},
				},
			},
			asyncReducers: {
				articleDetails: articleDetailsReducer,
			},
		});

		expect(screen.getByText('Назад к списку')).toBeInTheDocument();
		expect(screen.getByText('Редактировать')).toBeInTheDocument();
	});
});
