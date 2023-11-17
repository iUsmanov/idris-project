import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Skeleton } from './Skeleton';

describe('Select.test', () => {
	test('Component is rendered', async () => {
		componentRender(<Skeleton height={100} width={100} borderRadius='50%' />);

		const styles = {
			width: '100px',
			height: '100px',
			['border-radius']: '50%',
		};

		const skeleton = screen.getByTestId('Skeleton');

		expect(skeleton).toBeInTheDocument();
		expect(skeleton).toHaveStyle(styles);
	});
});
