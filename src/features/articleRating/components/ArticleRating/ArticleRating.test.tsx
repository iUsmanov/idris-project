import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleRating } from './ArticleRating';
import { screen } from '@testing-library/react';
import { useGetArticleRatingQuery } from '../../api/articleRatingApi';
import { mockUser } from '@/entities/User/testing';
import { mockRating } from '../../mocks';

window.matchMedia = jest.fn().mockImplementation((query) => ({}));

// jest.mock('../../api/articleRatingApi', () => ({
// 	useGetArticleRatingQuery: jest.fn(),
// usePostArticleRatingMutation: jest.fn(() => []),
// }));
// const mockedUsePostArticleRatingMutation = usePostArticleRatingMutation as jest.Mock;

jest.mock('../../api/articleRatingApi', () => {
	return {
		...jest.requireActual('../../api/articleRatingApi'),
		useGetArticleRatingQuery: jest.fn(),
	};
});

const mockedUseGetArticleRatingQuery = useGetArticleRatingQuery as jest.Mock;

describe('ArticleRating.test', () => {
	test('Component is rendered', async () => {
		mockedUseGetArticleRatingQuery.mockReturnValue({});
		await componentRender(<ArticleRating articleId='1' />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('RatingCard')).toBeInTheDocument();
		expect(mockedUseGetArticleRatingQuery).toHaveBeenCalledWith({ userId: '', articleId: '1' });
	});
	test('useGetArticleRatingQuery with normal userId', async () => {
		mockedUseGetArticleRatingQuery.mockReturnValue({});
		await componentRender(<ArticleRating articleId='1' />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
			},
		});

		expect(screen.getByTestId('RatingCard')).toBeInTheDocument();
		expect(mockedUseGetArticleRatingQuery).toHaveBeenCalledWith({
			userId: mockUser.id,
			articleId: '1',
		});
	});

	test('If user rated', async () => {
		mockedUseGetArticleRatingQuery.mockReturnValue({ data: [mockRating] });
		await componentRender(<ArticleRating articleId='1' />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
			},
		});

		expect(screen.getByText('Спасибо за оценку!')).toBeInTheDocument();
		expect(mockedUseGetArticleRatingQuery).toHaveBeenCalledWith({
			userId: mockUser.id,
			articleId: '1',
		});
	});

	test('IsLoading', async () => {
		mockedUseGetArticleRatingQuery.mockReturnValue({ isLoading: true });
		await componentRender(<ArticleRating articleId='1' />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('Skeleton')).toBeInTheDocument();
	});
});
