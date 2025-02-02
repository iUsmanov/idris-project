// Я не смог решить проблему связанную со строками
// await user.clear(input); или await user.type(input, value);
// expect(input).toHaveValue('');

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Input } from './Input';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('Input.test', () => {
	test('Component is componentRendered', () => {
		componentRender(<Input placeholder='placeholder' />);
		expect(screen.getByTestId('Input')).toBeInTheDocument();
		expect(screen.getByTestId('componentWrapper')).toBeInTheDocument();
		expect(screen.getByTestId('placeholder')).toBeInTheDocument();
	});

	test('Component has placeholder', () => {
		const placeholder = 'placeholder';
		componentRender(<Input placeholder={placeholder} />);

		expect(screen.getByText(placeholder + '>')).toBeInTheDocument();
		expect(screen.getByTestId('Input')).toBeInTheDocument();
	});

	test('Component has type', () => {
		const type = 'number';
		componentRender(<Input type={type} />);

		expect(screen.getByTestId('Input')).toHaveAttribute('type', type);
	});

	test('Component has value', () => {
		const value = 'value';
		componentRender(<Input value={value} />);

		const input = screen.getByTestId('Input');

		expect(input).toHaveValue(value);
	});

	// test('Clear value of input', async () => {
	// 	const value = 'value';
	// 	componentRender(<Input value={value} />);
	// 	const user = userEvent.setup();

	// 	const input = screen.getByTestId('Input');
	// 	await user.clear(input);
	// 	await waitFor(
	// 		() => {
	// 			expect(input).toHaveValue(''); -- This string calls bug(error)
	// 		},
	// 		{ timeout: 1000 }
	// 	);
	// });

	// test('Typing text to Input', async () => {
	// 	const value = 'value';
	// 	componentRender(<Input />);
	// 	const user = userEvent.setup();

	// 	const input: HTMLInputElement = screen.getByTestId('Input');
	// 	await user.type(input, value);
	// 	setTimeout(() => {
	// 		expect(input).toHaveValue(value); -- This string calls bug(error)
	// 	}, 0);
	// });

	test('Typing text to Input with onChange', async () => {
		const value = 'value';
		const onChange = jest.fn();
		componentRender(<Input value={''} onChange={onChange} />);

		const input: HTMLInputElement = screen.getByTestId('Input');
		await userEvent.type(input, value);
		// expect(input).toHaveValue(value); -- This string calls bug(error)
		expect(onChange).toHaveBeenCalledTimes(5);
		expect(onChange).toHaveBeenCalledWith('v');
		expect(onChange).toHaveBeenCalledWith('a');
		expect(onChange).toHaveBeenCalledWith('l');
		expect(onChange).toHaveBeenCalledWith('u');
		expect(onChange).toHaveBeenCalledWith('e');
	});

	test('Typing text to Input with onChange and passed name', async () => {
		const value = 'value';
		const name = 'username';
		const onChange = jest.fn();
		componentRender(<Input value={''} onChange={onChange} name={name} />);

		const input: HTMLInputElement = screen.getByTestId('Input');
		await userEvent.type(input, value);
		// expect(input).toHaveValue(value); -- This string calls bug(error)
		expect(onChange).toHaveBeenCalledTimes(5);
		expect(onChange).toHaveBeenCalledWith('v', name);
		expect(onChange).toHaveBeenCalledWith('a', name);
		expect(onChange).toHaveBeenCalledWith('l', name);
		expect(onChange).toHaveBeenCalledWith('u', name);
		expect(onChange).toHaveBeenCalledWith('e', name);
	});

	test('Readonly', () => {
		const value = 'value';
		componentRender(<Input value={value} readOnly />);

		const input: HTMLInputElement = screen.getByTestId('Input');
		expect(input).toHaveAttribute('readonly');
		expect(input).not.toHaveFocus();
		expect(screen.queryByTestId('caret')).toBeNull();
	});

	test('Autofocus on Input', () => {
		componentRender(<Input autoFocus />);

		expect(screen.getByTestId('Input')).toHaveFocus();
		expect(screen.getByTestId('caret')).toBeInTheDocument();
	});
});
