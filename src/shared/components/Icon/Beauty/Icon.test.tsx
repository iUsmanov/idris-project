import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';
import TestIcon from '@/shared/assets/tests/avatar.svg';
import userEvent from '@testing-library/user-event';

describe('Icon.test', () => {
	test('Component is rendered', () => {
		render(<Icon Svg={TestIcon} />);
		expect(screen.getByText('mockedSVG')).toBeInTheDocument();
	});

	test('Svg is wrapped in a button if prop clickable is true', () => {
		const callback = jest.fn();
		render(<Icon Svg={TestIcon} clickable onClick={callback} />);

		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByText('mockedSVG')).toBeInTheDocument();
	});

	test('Icon is clickable', async () => {
		const callback = jest.fn();
		render(<Icon Svg={TestIcon} clickable onClick={callback} />);

		const Button = screen.getByRole('button');
		await userEvent.click(Button);

		expect(callback).toHaveBeenCalled();
		expect(screen.getByText('mockedSVG')).toBeInTheDocument();
	});
});
