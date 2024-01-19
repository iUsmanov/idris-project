import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleImageBlockComponent } from './ArticleImageBlockComponent';
import { mockArticleBlockImage } from '../../mocks';
import { screen } from '@testing-library/react';

describe('ArticleImageBlockComponent.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<ArticleImageBlockComponent block={mockArticleBlockImage} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleImageBlock')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleImageBlock.Image')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleImageBlock.Description.Title')).toBeInTheDocument();
	});
});
