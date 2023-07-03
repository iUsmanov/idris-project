import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage';
import { User } from '../types/user';
import { UserSchema } from '../types/user';
import { userActions, userReducer } from './userSlice';

describe('userSlice.test', () => {
	test('setAuthData', () => {
		const state: DeepPartial<UserSchema> = {};
		const payload: User = { id: '1', username: '123' };
		const expected: UserSchema = {
			authData: { id: '1', username: '123' },
		};
		expect(userReducer(state as UserSchema, userActions.setAuthData(payload))).toEqual(expected);
	});
	test('initAuthData', () => {
		const state: DeepPartial<UserSchema> = {};
		const user = { id: '1', username: '123' };
		localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
		const expected: UserSchema = {
			_inited: true,
			authData: user,
		};
		expect(userReducer(state as UserSchema, userActions.initAuthData())).toEqual(expected);
	});
	test('logout', () => {
		const state: DeepPartial<UserSchema> = { authData: { id: '1', username: '123' } };
		const expected: UserSchema = {};
		expect(userReducer(state as UserSchema, userActions.logout())).toEqual(expected);
	});
});
