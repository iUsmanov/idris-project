import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleEditPage } from './ArticleEditPage';
import { getRouteArticleCreate, getRouteArticleEdit } from '@/shared/const/router';

describe('ArticleEditPage.test', () => {
	test('Component is rendered. ArticleEditPage', async () => {
		await componentRender(<ArticleEditPage />, {
			wrapInAct: true,
			route: getRouteArticleEdit('1'),
		});

		expect(screen.getByTestId('ArticleEditPage')).toHaveTextContent('Редактирование статьи с ID = 1');
	});
	test('Component is rendered. ArticleCreatePage', async () => {
		await componentRender(<ArticleEditPage />, {
			wrapInAct: true,
			route: getRouteArticleCreate(),
		});

		expect(screen.getByTestId('ArticleEditPage')).toHaveTextContent('Создание новой статьи');
	});
});
