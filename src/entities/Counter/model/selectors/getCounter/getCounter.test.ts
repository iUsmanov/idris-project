import { StateSchema } from '@/app/providers/StoreProvider/testing';
import { getCounter } from './getCounter';

describe('getCounter.test', () => {
	test('should return value of object counter', () => {
		const state: DeepPartial<StateSchema> = {
			counter: {
				value: 10,
			},
		};
		expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
	});
});
