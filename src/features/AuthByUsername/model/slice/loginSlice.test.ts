import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { loginActions, loginReducer } from './loginSlice';
import { LoginSchema } from '../types/LoginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

describe('loginSlice.test', () => {
	test('Set username', () => {
		const state: DeepPartial<LoginSchema> = { username: '123' };
		expect(loginReducer(state as LoginSchema, loginActions.setUsername('123123'))).toEqual({
			username: '123123',
		});
	});
	test('Set password', () => {
		const state: DeepPartial<LoginSchema> = { password: '123' };
		expect(loginReducer(state as LoginSchema, loginActions.setPassword('123123'))).toEqual({
			password: '123123',
		});
	});
	test('Set isLoading', () => {
		const state: DeepPartial<LoginSchema> = { isLoading: false };
		expect(loginReducer(state as LoginSchema, loginByUsername.pending)).toEqual({
			isLoading: true,
		});
	});
});
