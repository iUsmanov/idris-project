import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Input } from './Input';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { userEvent } from '@testing-library/user-event';

const label = 'label';
describe('Input.test', () => {
	test('Component is componentRendered', async () => {
		await act(async () => componentRender(<Input size='l' />));

		const componentWrapper = screen.getByTestId('componentWrapper');

		expect(screen.getByTestId('Input')).toBeInTheDocument();
		expect(componentWrapper).toBeInTheDocument();
		expect(componentWrapper).toHaveClass('size_l');
	});

	test('Component has label', async () => {
		await act(async () => componentRender(<Input label={label} />));

		expect(screen.getByTestId('Input')).toBeInTheDocument();
		expect(screen.getByText(label)).toBeInTheDocument();
	});

	test('Component has placeholder', async () => {
		const placeholder = 'placeholder';
		await act(async () => componentRender(<Input placeholder={placeholder} />));

		expect(screen.getByTestId('Input')).toHaveAttribute(placeholder, placeholder);
	});

	test('Component has type', async () => {
		const type = 'number';
		await act(async () => componentRender(<Input type={type} />));

		expect(screen.getByTestId('Input')).toHaveAttribute('type', type);
	});

	test('Component has value', async () => {
		const value = 'value';
		await act(async () => componentRender(<Input value={value} />));

		const input = screen.getByTestId('Input');

		expect(input).toHaveValue(value);
	});

	test('Typing text to Input with onChange', async () => {
		const value = 'value';
		const onChange = jest.fn();
		await act(async () => componentRender(<Input value={''} onChange={onChange} />));

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
		await act(async () => componentRender(<Input value={''} onChange={onChange} name={name} />));

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

	test('Readonly', async () => {
		await act(async () => componentRender(<Input label={label} readOnly />));

		const input: HTMLInputElement = screen.getByTestId('Input');
		const labelParent = screen.getByTestId('labelParent');

		expect(input).toHaveAttribute('readonly');
		expect(labelParent).toBeInTheDocument();
		expect(labelParent).toHaveClass('readonly');
		expect(input).not.toHaveFocus();
	});

	test('Autofocus on Input', async () => {
		await act(async () => componentRender(<Input autoFocus />));

		expect(screen.getByTestId('Input')).toHaveFocus();
	});

	test('Input with addons', async () => {
		await act(async () => componentRender(<Input addonLeft='addonLeft' addonRight='addonRight' />));

		const addonLeft = screen.getByText('addonLeft');
		const addonRight = screen.getByText('addonRight');

		expect(addonLeft).toHaveClass('addonLeft');
		expect(addonRight).toHaveClass('addonRight');
	});
});
