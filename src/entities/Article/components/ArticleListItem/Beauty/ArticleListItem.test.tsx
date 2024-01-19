import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { ArticleListItem } from './ArticleListItem';
import { mockArticle } from '../../../mocks';

describe('ArticleListItem.test', () => {
	test('Component is rendered with view - LIST', async () => {
		await componentRender(<ArticleListItem article={mockArticle} view='LIST' />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleListItem.LIST')).toBeInTheDocument();
		expect(screen.getByTestId('Views')).toBeInTheDocument();
		expect(screen.getByTestId('Avatar')).toBeInTheDocument();
	});

	test('Component is rendered with view - TILE', async () => {
		await componentRender(<ArticleListItem article={mockArticle} view='TILE' />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleListItem.TILE')).toBeInTheDocument();
		expect(screen.getByTestId('Views')).toBeInTheDocument();
	});
});
