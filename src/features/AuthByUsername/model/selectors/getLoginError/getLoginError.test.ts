import { StateSchema } from '@/app/providers/StoreProvider';

import { getLoginError } from './getLoginError';

describe('getLoginError.test', () => {
	test('With text', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {
				error: 'error',
			},
		};
		expect(getLoginError(state as StateSchema)).toEqual('error');
	});

	test('With undefined', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {},
		};
		expect(getLoginError(state as StateSchema)).toEqual(undefined);
	});
});
