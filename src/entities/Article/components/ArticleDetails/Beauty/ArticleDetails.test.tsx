import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { ArticleDetails } from './ArticleDetails';
import { mockArticle } from '../../../mocks';
import { getRouteArticleDetails } from '@/shared/const/router';
import { setFeatureFlags } from '@/shared/lib/featureFlags';
import { articleDetailsReducer } from '../../../model/slice/articleDetailsSlice';

const orgImage = window.Image;
class FakeImageSuccess {
	onload?: () => void;
	constructor() {
		setTimeout(() => {
			this.onload && this.onload(); // simulate success
		}, 0);
	}
}

describe('ArticleDetails.test', () => {
	afterEach(() => {
		window.Image = orgImage;
	});
	setFeatureFlags({ isBeautyDesign: true });
	test('Component is rendered', async () => {
		window.Image = FakeImageSuccess as any;
		await componentRender(<ArticleDetails />, {
			wrapInAct: true,
			initialState: {
				articleDetails: {
					data: mockArticle,
				},
			},
			asyncReducers: {
				articleDetails: articleDetailsReducer,
			},
			route: getRouteArticleDetails('1'),
		});

		expect(screen.getByTestId('ArticleDetails')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleDetails.Image')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleDetails.Title')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleDetails.Subtitle')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleImageBlock')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleTextBlock')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleCodeBlock')).toBeInTheDocument();
	});

	test('Error', async () => {
		await componentRender(<ArticleDetails />, {
			wrapInAct: true,
			initialState: {
				articleDetails: {
					error: 'error',
				},
			},
			asyncReducers: {
				articleDetails: articleDetailsReducer,
			},
			route: getRouteArticleDetails('1'),
		});

		expect(screen.getByText('Произошла ошибка при загрузке статьи')).toBeInTheDocument();
		expect(screen.queryByText('ArticleDetails')).toBeNull();
	});

	test('Loading', async () => {
		await componentRender(<ArticleDetails />, {
			wrapInAct: true,
			initialState: {
				articleDetails: {
					isLoading: true,
				},
			},
			asyncReducers: {
				articleDetails: articleDetailsReducer,
			},
			route: getRouteArticleDetails('1'),
		});

		expect(screen.getAllByTestId('Skeleton')).toHaveLength(5);
	});
});
