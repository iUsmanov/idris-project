import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button.test', () => {
	test('Is button rendered', () => {
		render(<Button>TEST</Button>);
		expect(screen.getByText('TEST')).toBeInTheDocument();
	});
	test('Does button have class', () => {
		render(<Button variant='clear'>TEST</Button>);
		expect(screen.getByText('TEST')).toHaveClass('clear');
	});
});
