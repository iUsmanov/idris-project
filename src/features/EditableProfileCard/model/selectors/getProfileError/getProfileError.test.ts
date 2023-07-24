import { StateSchema } from '@/app/providers/StoreProvider/testing';
import { getProfileError } from './getProfileError';

describe('getProfileError.test', () => {
	test('getError', () => {
		const state: DeepPartial<StateSchema> = {
			profile: { error: 'error' },
		};
		expect(getProfileError(state as StateSchema)).toEqual('error');
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileError(state as StateSchema)).toEqual(undefined);
	});
});
