import { getLoginPassword } from './getLoginPassword';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getLoginPassword.test', () => {
	test('With text', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {
				password: '123',
			},
		};
		expect(getLoginPassword(state as StateSchema)).toEqual('123');
	});

	test('With undefined', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {},
		};
		expect(getLoginPassword(state as StateSchema)).toEqual('');
	});
});
