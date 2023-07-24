import { getLoginUsername } from './getLoginUsername';
import { StateSchema } from '@/app/providers/StoreProvider/testing';

describe('getLoginUsername.test', () => {
	test('With text', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {
				username: 'admin',
			},
		};
		expect(getLoginUsername(state as StateSchema)).toEqual('admin');
	});

	test('With undefined', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {},
		};
		expect(getLoginUsername(state as StateSchema)).toEqual('');
	});
});
