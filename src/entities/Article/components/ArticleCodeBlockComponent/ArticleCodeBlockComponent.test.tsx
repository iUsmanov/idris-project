import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';
import { mockArticleBlockCode } from '../../mocks';
import { screen } from '@testing-library/react';

describe('ArticleCodeBlockComponent.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<ArticleCodeBlockComponent block={mockArticleBlockCode} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleCodeBlock')).toBeInTheDocument();
		expect(screen.getByTestId('Code')).toBeInTheDocument();
	});
});
