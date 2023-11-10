import { screen } from '@testing-library/react';
import { Card } from './Card';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('Card.test', () => {
	test('Component is rendered', () => {
		componentRender(<Card>TEST</Card>);
		expect(screen.getByText('TEST')).toBeInTheDocument();
	});
	test('Component is not flex', () => {
		componentRender(
			<Card variant='outline' max>
				TEST
			</Card>
		);
		const Component = screen.getByText('TEST');
		expect(Component).toHaveClass('outline max');
		expect(Component).not.toHaveClass('flex justifyLeft alignStart directionRow nowrap');
	});
	test('Component is flex', () => {
		componentRender(
			<Card variant='outline' flex>
				TEST
			</Card>
		);
		screen.debug();
		expect(screen.getByText('TEST')).toHaveClass(
			'card outline padding-8 border-normal flex justifyLeft alignStart directionRow nowrap'
		);
	});
});
