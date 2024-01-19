import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { CommentCard } from './CommentCard';
import { mockComment } from '../../../mocks';

describe('CommentCard.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<CommentCard comment={mockComment} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('CommentCard')).toBeInTheDocument();
	}, 30000);
});
