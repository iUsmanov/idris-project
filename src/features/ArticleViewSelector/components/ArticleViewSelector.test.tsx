import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleViewSelector } from '../../ArticleViewSelector';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

const onViewClick = jest.fn();

describe('ArticleViewSelector.test', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('Component is rendered', async () => {
		await componentRender(<ArticleViewSelector view='LIST' />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleViewSelector')).toBeInTheDocument();
		expect(screen.getAllByTestId('Button')).toHaveLength(2);
		expect(screen.getAllByText('mockedSVG')).toHaveLength(2);
	});
	test('Given handler work', async () => {
		await componentRender(<ArticleViewSelector view='LIST' onViewClick={onViewClick} />, {
			wrapInAct: true,
		});

		const firstView = screen.getAllByTestId('Button')[0];
		await userEvent.click(firstView);
		expect(onViewClick).toHaveBeenCalled();
	});
});
