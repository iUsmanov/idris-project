import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

test('loads and displays greeting', async () => {
	// ARRANGE
	render(<Counter />);

	// ACT
	await userEvent.click(screen.getByText('incrementor'));
	// await screen.findByRole('heading');

	// ASSERT
	expect(screen.getByTestId('count')).toHaveTextContent('1');
	// expect(screen.getByRole('button')).toBeDisabled();
});
