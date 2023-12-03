import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleDetailsPage } from './ArticleDetailsPage';
import { getRouteArticleDetails } from '@/shared/const/router';
import { setFeatureFlags } from '@/shared/lib/featureFlags';
import { articleDetailsReducer, mockArticle } from '@/entities/Article/testing';

window.matchMedia = jest.fn().mockImplementation((query) => ({}));
const intersectionObserverMock = () => ({
	observe: () => null,
	unobserve: () => null,
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

describe('ArticleDetailsPage.test', () => {
	test('Component is rendered. Without ArticleDetailsPageGreeting', async () => {
		setFeatureFlags({ isBeautyDesign: false });
		await componentRender(<ArticleDetailsPage />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
		});

		expect(screen.getByTestId('ArticleDetailsPage')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleDetailsHeader')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleDetails')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleRecommendations')).toBeInTheDocument();
		expect(screen.getByText('Комментарии')).toBeInTheDocument();
		expect(screen.getByText('Счётчик скоро появится!')).toBeInTheDocument();
		expect(screen.getByText('Оценка статей скоро появится!')).toBeInTheDocument();
	});
	test('Component is rendered. Without ArticleDetailsPageGreeting', async () => {
		setFeatureFlags({ isBeautyDesign: false });
		await componentRender(<ArticleDetailsPage />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
			initialState: {
				articleDetails: {
					error: 'error',
				},
			},
			asyncReducers: {
				articleDetails: articleDetailsReducer,
			},
		});

		expect(screen.getByTestId('ArticleDetailsPage')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleDetailsHeader')).toBeInTheDocument();
		expect(screen.getByText('Произошла ошибка при загрузке статьи')).toBeInTheDocument();

		expect(screen.queryByTestId('ArticleDetails')).toBeNull();
		expect(screen.queryByTestId('ArticleRecommendations')).toBeNull();
		expect(screen.queryByText('Комментарии')).toBeNull();
		expect(screen.queryByText('Счётчик скоро появится!')).toBeNull();
		expect(screen.queryByText('Оценка статей скоро появится!')).toBeNull();
	});
});

// ================================
// ================================
// ================================
// ================================
// ================================

describe('ArticleDetailsPage.test Beauty', () => {
	test('Component is rendered. Without ArticleDetailsPageGreeting', async () => {
		setFeatureFlags({ isBeautyDesign: true });
		await componentRender(<ArticleDetailsPage />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
			initialState: {
				articleDetails: {
					data: mockArticle,
				},
			},
			asyncReducers: {
				articleDetails: articleDetailsReducer,
			},
		});

		expect(screen.getByTestId('ArticleDetailsPage')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleDetailsHeader')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleDetails')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleRecommendations')).toBeInTheDocument();
		expect(screen.getByText('Комментарии')).toBeInTheDocument();
		expect(screen.getByText('Счётчик скоро появится!')).toBeInTheDocument();
		expect(screen.getByText('Оценка статей скоро появится!')).toBeInTheDocument();
	});
	test('Component is rendered. Without ArticleDetailsPageGreeting', async () => {
		setFeatureFlags({ isBeautyDesign: true });
		await componentRender(<ArticleDetailsPage />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
			initialState: {
				articleDetails: {
					error: 'error',
				},
			},
			asyncReducers: {
				articleDetails: articleDetailsReducer,
			},
		});

		expect(screen.getByTestId('ArticleDetailsPage')).toBeInTheDocument();
		expect(screen.getByText('Произошла ошибка при загрузке статьи')).toBeInTheDocument();

		expect(screen.queryByTestId('ArticleDetailsHeader')).toBeNull();
		expect(screen.queryByTestId('ArticleDetails')).toBeNull();
		expect(screen.queryByTestId('ArticleRecommendations')).toBeNull();
		expect(screen.queryByText('Комментарии')).toBeNull();
		expect(screen.queryByText('Счётчик скоро появится!')).toBeNull();
		expect(screen.queryByText('Оценка статей скоро появится!')).toBeNull();
	});
});
