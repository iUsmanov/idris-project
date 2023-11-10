import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button.test', () => {
	test('Component is rendered', () => {
		render(<Button>TEST</Button>);
		expect(screen.getByText('TEST')).toBeInTheDocument();
	});
	test('Component have class', () => {
		render(
			<Button variant='clear' fullWidth>
				TEST
			</Button>
		);
		expect(screen.getByText('TEST')).toHaveClass('clear fullWidth');
	});
});
