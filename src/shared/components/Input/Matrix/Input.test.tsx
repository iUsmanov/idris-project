import { screen } from '@testing-library/react';
import { Input } from './Input';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('Input.test', () => {
	// test('Component is componentRendered', () => {
	// 	componentRender(<Input />);
	// 	expect(screen.getByTestId('Input')).toBeInTheDocument();
	// });

	// test('Component has placeholder', () => {
	// 	const placeholder = 'placeholder';
	// 	componentRender(<Input placeholder={placeholder} />);

	// 	expect(screen.getByText(placeholder + '>')).toBeInTheDocument();
	// 	expect(screen.getByTestId('Input')).toBeInTheDocument();
	// });

	// test('Component has type', () => {
	// 	const type = 'number';
	// 	componentRender(<Input type={type} />);

	// 	expect(screen.getByTestId('Input')).toHaveAttribute('type', type);
	// });

	// test('Component has value', () => {
	// 	const value = 'value';
	// 	componentRender(<Input value={value} />);

	// 	const input = screen.getByTestId('Input');

	// 	expect(input).toHaveValue(value);
	// });

	// test('Typing text to Input', async () => {
	// 	const value = 'value';
	// 	const user = userEvent.setup();
	// 	componentRender(<Input />);

	// 	// const input = screen.getByTestId('Input');
	// 	await user.type(screen.getByTestId('Input'), value);
	// 	screen.debug();
	// 	expect(screen.getByTestId('Input')).toHaveValue(value);
	// });

	test('Clear value of input', async () => {
		const user = userEvent.setup();
		const value = 'value';
		componentRender(<Input value={value} />);

		await user.clear(screen.getByTestId('Input'));
		screen.debug();
		expect(screen.getByTestId('Input')).toHaveValue('');
	});

	// test('Autofocus on Input', async () => {
	// 	componentRender(<Input autoFocus />);

	// 	expect(screen.getByTestId('Input')).toHaveFocus();
	// });
});
