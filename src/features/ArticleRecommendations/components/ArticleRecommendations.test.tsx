import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleRecommendations } from './ArticleRecommendations';
import { screen } from '@testing-library/react';
import { useGetArticleRecommendationsQuery } from '../api/articleRecommendationsApi';
import { mockArticles } from '@/entities/Article/testing';

jest.mock('../api/articleRecommendationsApi', () => {
	return {
		...jest.requireActual('../api/articleRecommendationsApi'),
		useGetArticleRecommendationsQuery: jest.fn(),
	};
});

const mockedUseGetArticleRecommendationsQuery = useGetArticleRecommendationsQuery as jest.Mock;

describe('ArticleRecommendations.test', () => {
	test('Component is rendered', async () => {
		mockedUseGetArticleRecommendationsQuery.mockReturnValue({});
		await componentRender(<ArticleRecommendations />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleRecommendations')).toBeInTheDocument();
		expect(screen.getByText('Рекомендуем')).toBeInTheDocument();
		expect(screen.getByText('Статьи не найдены')).toBeInTheDocument();
	});

	test('Error', async () => {
		mockedUseGetArticleRecommendationsQuery.mockReturnValue({ error: 'error' });
		await componentRender(<ArticleRecommendations />, {
			wrapInAct: true,
		});

		expect(screen.getByText('Произошла непредвиденная ошибка')).toBeInTheDocument();
	});

	test('IsLoading', async () => {
		mockedUseGetArticleRecommendationsQuery.mockReturnValue({ isLoading: true });
		await componentRender(<ArticleRecommendations />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleList.TILE')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleListSkeleton.TILE')).toBeInTheDocument();
	});

	test('With loaded articles', async () => {
		mockedUseGetArticleRecommendationsQuery.mockReturnValue({ data: mockArticles });
		await componentRender(<ArticleRecommendations />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleList.TILE')).toBeInTheDocument();
		expect(screen.getAllByTestId('ArticleListItem.TILE')).toHaveLength(mockArticles.length);
	});

	test('With loaded articles and IsLoaded', async () => {
		mockedUseGetArticleRecommendationsQuery.mockReturnValue({ data: mockArticles, isLoading: true });
		await componentRender(<ArticleRecommendations />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleList.TILE')).toBeInTheDocument();
		expect(screen.getAllByTestId('ArticleListItem.TILE')).toHaveLength(mockArticles.length);
		expect(screen.getByTestId('ArticleListSkeleton.TILE')).toBeInTheDocument();
	});
});
