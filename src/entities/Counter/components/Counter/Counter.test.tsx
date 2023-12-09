import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { StateSchema } from '@/app/providers/StoreProvider/testing';

describe('Counter.test', () => {
	test('Just render', async () => {
		const initialState: DeepPartial<StateSchema> = {
			counter: {
				value: 10,
			},
		};
		componentRender(<Counter />, { initialState });

		expect(screen.getByTestId('count')).toHaveTextContent('10');
	});
	test('incrementor', async () => {
		const initialState: DeepPartial<StateSchema> = {
			counter: {
				value: 10,
			},
		};
		await componentRender(<Counter />, { initialState, wrapInAct: true });

		await userEvent.click(screen.getByText('increment'));

		expect(screen.getByTestId('count')).toHaveTextContent('11');
	});
	test('decrementor', async () => {
		const initialState: DeepPartial<StateSchema> = {
			counter: {
				value: 10,
			},
		};
		await componentRender(<Counter />, { initialState, wrapInAct: true });

		await userEvent.click(screen.getByText('decrement'));

		expect(screen.getByTestId('count')).toHaveTextContent('9');
	});
});
