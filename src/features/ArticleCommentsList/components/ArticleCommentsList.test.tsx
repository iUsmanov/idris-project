import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleCommentsList } from './ArticleCommentsList';
import { getRouteArticleDetails } from '@/shared/const/router';
import { articleCommentsListReducer } from '../model/slice/articleCommentsListSlice';
import { screen } from '@testing-library/react';
import { mockCommentsEntities } from '../mocks';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

describe('ArticleCommentsList.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<ArticleCommentsList />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
		});

		expect(screen.getByTestId('AddNewComment')).toBeInTheDocument();
		expect(screen.getByTestId('CommentsList')).toBeInTheDocument();
		expect(screen.getByText('Комментарии')).toBeInTheDocument();
		expect(screen.getByText('Комментарии отсутствуют')).toBeInTheDocument();
	});

	test('sendError', async () => {
		await componentRender(<ArticleCommentsList />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
			initialState: {
				articleCommentsList: {
					sendError: 'error',
					entities: {},
					ids: [],
				},
			},
			asyncReducers: {
				articleCommentsList: articleCommentsListReducer,
			},
		});

		expect(screen.getByText('Произошла непредвиденная ошибка')).toBeInTheDocument();
	});

	test('commentsError', async () => {
		await componentRender(<ArticleCommentsList />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
			initialState: {
				articleCommentsList: {
					commentsError: 'error',
					entities: {},
					ids: [],
				},
			},
			asyncReducers: {
				articleCommentsList: articleCommentsListReducer,
			},
		});

		expect(screen.getByText('Произошла непредвиденная ошибка')).toBeInTheDocument();
	});

	test('isSendLoading', async () => {
		await componentRender(<ArticleCommentsList />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
			initialState: {
				articleCommentsList: {
					isSendLoading: true,
					entities: {},
					ids: [],
				},
			},
			asyncReducers: {
				articleCommentsList: articleCommentsListReducer,
			},
		});

		expect(screen.getByText('Отправить')).toBeDisabled();
	});

	test('isCommentsLoading', async () => {
		await componentRender(<ArticleCommentsList />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
			initialState: {
				articleCommentsList: {
					isCommentsLoading: true,
					entities: {},
					ids: [],
				},
			},
			asyncReducers: {
				articleCommentsList: articleCommentsListReducer,
			},
		});

		expect(screen.getByTestId('CommentsList.IsLoading')).toBeInTheDocument();
	});

	test('Normal', async () => {
		await componentRender(<ArticleCommentsList />, {
			wrapInAct: true,
			route: getRouteArticleDetails('1'),
			initialState: {
				articleCommentsList: {
					entities: mockCommentsEntities.entities,
					ids: mockCommentsEntities.ids,
				},
			},
			asyncReducers: {
				articleCommentsList: articleCommentsListReducer,
			},
		});

		expect(screen.getByTestId('CommentsList')).toBeInTheDocument();
		expect(screen.getAllByTestId('CommentCard')).toHaveLength(mockCommentsEntities.ids.length);
	});
});
