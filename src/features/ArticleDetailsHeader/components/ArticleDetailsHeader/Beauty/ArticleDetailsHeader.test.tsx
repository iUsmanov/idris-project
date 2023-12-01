import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleDetailsHeader } from './ArticleDetailsHeader';
import { getRouteArticleDetails } from '@/shared/const/router';
import { screen } from '@testing-library/react';
import { setFeatureFlags } from '@/shared/lib/featureFlags';
import { articleDetailsReducer, mockArticle } from '@/entities/Article/testing';

describe('ArticleDetailsHeader.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Component is rendered', async () => {
		await componentRender(
			<ArticleDetailsHeader
				author={mockArticle.user}
				createdAt={mockArticle.createdAt}
				views={mockArticle.views}
			/>,
			{
				wrapInAct: true,
				route: getRouteArticleDetails('1'),
			}
		);

		expect(screen.getByTestId('ArticleDetailsHeader')).toBeInTheDocument();
		expect(screen.getByTestId('Avatar')).toBeInTheDocument();
		expect(screen.getByText(mockArticle.user.username)).toBeInTheDocument();
		expect(screen.getByText(mockArticle.createdAt)).toBeInTheDocument();
		expect(screen.getByText('Просмотров')).toBeInTheDocument();
		expect(screen.queryByText('Редактировать')).toBeNull();
	});

	test('We cannot edit', async () => {
		await componentRender(
			<ArticleDetailsHeader
				author={mockArticle.user}
				createdAt={mockArticle.createdAt}
				views={mockArticle.views}
			/>,
			{
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
			}
		);

		expect(screen.queryByText('Редактировать')).toBeNull();
	});

	test('We can edit', async () => {
		await componentRender(
			<ArticleDetailsHeader
				author={mockArticle.user}
				createdAt={mockArticle.createdAt}
				views={mockArticle.views}
			/>,
			{
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
			}
		);

		expect(screen.getByText('Редактировать')).toBeInTheDocument();
	});
});
