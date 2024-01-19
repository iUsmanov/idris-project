import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { ArticleList } from './ArticleList';
import { mockArticles } from '../../../mocks';

describe('ArticleDetails.test', () => {
	test('No article passed in the component', async () => {
		await componentRender(<ArticleList />, {
			wrapInAct: true,
		});

		expect(screen.getByText('Статьи не найдены')).toBeInTheDocument();
	});

	test('Loading with view = TILE', async () => {
		await componentRender(<ArticleList isLoading />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleList.TILE')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleListSkeleton.TILE')).toBeInTheDocument();
		expect(screen.getAllByTestId('ArticleListItemSkeleton.TILE')).toHaveLength(9);
	});

	test('Loading with view = LIST', async () => {
		await componentRender(<ArticleList isLoading view='LIST' />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleList.LIST')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleListSkeleton.LIST')).toBeInTheDocument();
		expect(screen.getAllByTestId('ArticleListItemSkeleton.LIST')).toHaveLength(3);
	});

	test('Component is rendered with view = TILE', async () => {
		await componentRender(<ArticleList isLoading articles={mockArticles} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleList.TILE')).toBeInTheDocument();
		expect(screen.getAllByTestId('ArticleListItem.TILE')).toHaveLength(4);
	});

	test('Component is rendered with view = LIST', async () => {
		await componentRender(<ArticleList isLoading articles={mockArticles} view='LIST' />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleList.LIST')).toBeInTheDocument();
		expect(screen.getAllByTestId('ArticleListItem.LIST')).toHaveLength(4);
	});
});
