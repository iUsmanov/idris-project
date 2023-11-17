import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Loader } from './Loader';
import { screen } from '@testing-library/react';

describe('Loader.test', () => {
	test('Loader min', () => {
		componentRender(<Loader size='min' />);
		expect(screen.getByTestId('Loader')).toHaveClass('min');
	});

	test('Loader max', () => {
		componentRender(<Loader size='max' />);
		expect(screen.getByTestId('Loader')).toHaveClass('max');
	});
});
