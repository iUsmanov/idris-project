import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button.test', () => {
	test('Component is rendered', () => {
		render(<Button>TEST</Button>);
		expect(screen.getByText('TEST')).toBeInTheDocument();
	});

	test('Component has class', () => {
		render(
			<Button variant='clear' square fullWidth color='error' size='size_xl'>
				TEST
			</Button>
		);
		expect(screen.getByText('TEST')).toHaveClass('clear square fullWidth error size_xl');
	});

	test('Component has addons', () => {
		render(
			<Button variant='clear' fullWidth addonLeft='Addon Left' addonRight='Addon Right'>
				TEST
			</Button>
		);
		expect(screen.getByText('TEST')).toBeInTheDocument();
		expect(screen.getByText('Addon Left')).toBeInTheDocument();
		expect(screen.getByText('Addon Right')).toBeInTheDocument();
	});
});
