import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { CommentsList } from './CommentsList';
import { mockComments } from '../../mocks';

describe('CommentList.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<CommentsList />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('CommentsList')).toBeInTheDocument();
		expect(screen.getByText('Комментарии отсутствуют')).toBeInTheDocument();
	});

	test('Error', async () => {
		await componentRender(<CommentsList error='error' />, {
			wrapInAct: true,
		});

		expect(screen.getByText('Произошла непредвиденная ошибка')).toBeInTheDocument();
	});

	test('Loading', async () => {
		await componentRender(<CommentsList isLoading />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('CommentsList.IsLoading')).toBeInTheDocument();
		expect(screen.getAllByTestId('Skeleton')).toHaveLength(6);
	});

	test('Comments is passed  to component', async () => {
		await componentRender(<CommentsList comments={mockComments} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('CommentsList')).toBeInTheDocument();
		expect(screen.getAllByTestId('CommentCard')).toHaveLength(3);
	});
});
