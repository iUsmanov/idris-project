import { screen, waitFor } from '@testing-library/react';
import { ArticlesInfiniteList } from './ArticlesInfiniteList';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import {
	articlesInfiniteListActions,
	articlesInfiniteListReducer,
} from '../../../model/slices/articlesInfiniteListSlice';
import { userEvent } from '@testing-library/user-event';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';
import { setFeatureFlags } from '@/shared/lib/featureFlags';
import { mockArticlesEntities } from '@/entities/Article/testing';

const mockDispatch = jest.fn();
const mockSetView = jest.fn();
const mockSetPage = jest.fn();
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

jest.mock('../../../model/services/fetchArticlesList/fetchArticlesList');

describe('ArticlesInfiniteList.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Error', async () => {
		await componentRender(<ArticlesInfiniteList />, {
			wrapInAct: true,
			initialState: {
				articlesInfiniteList: {
					ids: [],
					entities: {},
					error: 'error',
				},
			},
			asyncReducers: {
				articlesInfiniteList: articlesInfiniteListReducer,
			},
		});

		expect(screen.queryByTestId('ArticlesInfiniteList')).toBeNull();
		expect(screen.getByText('Произошла непредвиденная ошибка')).toBeInTheDocument();
	});
	test('Component is rendered', async () => {
		await componentRender(<ArticlesInfiniteList />, {
			wrapInAct: true,
			initialState: {
				articlesInfiniteList: {
					ids: mockArticlesEntities.ids,
					entities: mockArticlesEntities.entities,
					view: 'TILE',
				},
			},
			asyncReducers: {
				articlesInfiniteList: articlesInfiniteListReducer,
			},
		});

		expect(screen.getByTestId('ArticlesInfiniteList')).toBeInTheDocument();
		expect(screen.getByTestId('ArticlesSort')).toBeInTheDocument();
		expect(screen.getByTestId('ArticlesSearch')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleTypeTabs')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleViewSelector')).toBeInTheDocument();
		expect(screen.getByTestId('ArticleList.TILE')).toBeInTheDocument();
	});

	test('onChangeView', async () => {
		jest.spyOn(articlesInfiniteListActions, 'setView').mockImplementation(mockSetView);
		await componentRender(<ArticlesInfiniteList />, {
			wrapInAct: true,
			initialState: {
				articlesInfiniteList: {
					ids: mockArticlesEntities.ids,
					entities: mockArticlesEntities.entities,
					view: 'TILE',
				},
			},
			asyncReducers: {
				articlesInfiniteList: articlesInfiniteListReducer,
			},
		});

		const articleViewSelector = screen.getByTestId('ArticleViewSelector');
		const listIcon = articleViewSelector.querySelector('button');

		await userEvent.click(listIcon!);

		expect(mockDispatch).toHaveBeenCalled();
		expect(mockSetView).toHaveBeenCalledWith('LIST');
		expect(localStorage.getItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY)).toBe('LIST');
	});

	test('onChangeType', async () => {
		jest.spyOn(articlesInfiniteListActions, 'setPage').mockImplementation(mockSetPage);
		await componentRender(<ArticlesInfiniteList />, {
			wrapInAct: true,
			initialState: {
				articlesInfiniteList: {
					ids: mockArticlesEntities.ids,
					entities: mockArticlesEntities.entities,
					view: 'TILE',
				},
			},
			asyncReducers: {
				articlesInfiniteList: articlesInfiniteListReducer,
			},
		});

		await userEvent.click(screen.getByText('Наука'));

		// expect(mockDispatch).toHaveBeenCalledTimes(3);
		expect(mockSetPage).toHaveBeenCalledWith(1);
		expect(fetchArticlesList).toHaveBeenCalledWith({ replace: true });
	});

	test('onChangeSearch', async () => {
		jest.spyOn(articlesInfiniteListActions, 'setPage').mockImplementation(mockSetPage);
		await componentRender(<ArticlesInfiniteList />, {
			wrapInAct: true,
			initialState: {
				articlesInfiniteList: {
					ids: mockArticlesEntities.ids,
					entities: mockArticlesEntities.entities,
					view: 'TILE',
				},
			},
			asyncReducers: {
				articlesInfiniteList: articlesInfiniteListReducer,
			},
		});

		const articlesSearch = screen.getByTestId('ArticlesSearch');
		// const searchInput = articlesSearch.querySelector('input')!;

		await userEvent.type(articlesSearch, 'Text');

		expect(mockSetPage).toHaveBeenCalledWith(1);
		expect(mockSetPage).toHaveBeenCalledTimes(4);
		await waitFor(() => {
			expect(fetchArticlesList).toHaveBeenCalledWith({ replace: true });
			expect(fetchArticlesList).toHaveBeenCalledTimes(1);
		});
	});
});
