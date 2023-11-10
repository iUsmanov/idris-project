import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';
import TestIcon from '@/shared/assets/tests/avatar.svg';

describe('Icon.test', () => {
	test('Component is rendered', () => {
		render(<Icon Svg={TestIcon} />);
		expect(screen.getByText('mockedSVG')).toBeInTheDocument();
	});
});
