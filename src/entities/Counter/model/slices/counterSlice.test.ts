import { CounterSchema } from '../types/counterSchema';
import { counterActions, counterReducer } from './counterSlice';

describe('counterSlice.test', () => {
	test('increment', () => {
		const state: CounterSchema = {
			value: 10,
		};
		const result = counterReducer(state, counterActions.increment());
		expect(result).toEqual({ value: 11 });
	});
	test('decrement', () => {
		const state: CounterSchema = {
			value: 10,
		};
		const result = counterReducer(state, counterActions.decrement());
		expect(result).toEqual({ value: 9 });
	});
	test('decrement', () => {
		const result = counterReducer(undefined, counterActions.decrement());
		expect(result).toEqual({ value: -1 });
	});
});
