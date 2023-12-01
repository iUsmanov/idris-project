import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleTextBlockComponent } from './ArticleTextBlockComponent';
import { mockArticleBlockText } from '../../testing';
import { screen } from '@testing-library/react';

describe('ArticleTextBlockComponent.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<ArticleTextBlockComponent block={mockArticleBlockText} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleTextBlock')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleTextBlock.Description.Title')).toBeInTheDocument();
		mockArticleBlockText.paragraphs.forEach((p) => {
			expect(screen.getByText(p)).toBeInTheDocument();
		});
	});
});
