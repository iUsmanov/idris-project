import { screen } from '@testing-library/react';
import { Card } from './Card';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('Card.test', () => {
	test('Component is rendered', () => {
		componentRender(<Card>TEST</Card>);
		expect(screen.getByText('TEST')).toBeInTheDocument();
	});
	test('Component have class', () => {
		componentRender(
			<Card variant='outline' max>
				TEST
			</Card>
		);
		expect(screen.getByText('TEST')).toHaveClass('outline max');
	});
});
