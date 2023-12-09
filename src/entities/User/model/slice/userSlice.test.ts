import { getFeatureFlag } from '@/shared/lib/featureFlags';
import { mockUser } from '../../mocks';
import { UserSchema } from '../types/user';
import { userActions, userReducer } from './userSlice';
import { UserSettings } from '../types/userSettings';
import { saveUserSettings } from '../services/saveUserSettings/saveUserSettings';
import { initAuthData } from '../services/initAuthData/initAuthData';
import { getAllFeatureFlags } from '@/shared/lib/featureFlags/lib/setGetFeatures';

const mockReload = jest.fn();
Object.defineProperty(window, 'location', {
	configurable: true,
	value: { reload: mockReload },
});

describe('userSlice.test', () => {
	test('setAuthData', () => {
		const state: DeepPartial<UserSchema> = {};
		const expected: UserSchema = {
			authData: mockUser,
		};

		expect(userReducer(state as UserSchema, userActions.setAuthData(mockUser))).toEqual(expected);
		expect(getFeatureFlag('isBeautyDesign')).toBe(true);
	});

	test('logout', () => {
		const state: DeepPartial<UserSchema> = {
			authData: mockUser,
		};
		const expected: UserSchema = {};

		expect(userReducer(state as UserSchema, userActions.logout())).toEqual(expected);
		expect(mockReload).toHaveBeenCalled();
	});

	test('saveUserSettings.fulfilled', () => {
		const state: DeepPartial<UserSchema> = {
			authData: mockUser,
		};
		const payload: UserSettings = {
			isArticlesPageWasOpened: false,
		};
		const expected: UserSchema = {
			authData: {
				...mockUser,
				jsonSettings: payload,
			},
		};

		expect(userReducer(state as UserSchema, saveUserSettings.fulfilled(payload, '', {}))).toEqual(
			expected
		);
	});

	test('initAuthData.fulfilled', () => {
		const state: DeepPartial<UserSchema> = {
			_inited: false,
		};
		const expected: UserSchema = {
			_inited: true,
			authData: mockUser,
		};

		expect(userReducer(state as UserSchema, initAuthData.fulfilled(mockUser, ''))).toEqual(expected);
		expect(getAllFeatureFlags()).toEqual(mockUser.features);
	});

	test('initAuthData.rejected', () => {
		const state: DeepPartial<UserSchema> = {
			_inited: false,
		};
		const expected: UserSchema = {
			_inited: true,
		};

		expect(userReducer(state as UserSchema, initAuthData.rejected(null, 'error'))).toEqual(expected);
		// or
		expect(
			userReducer(state as UserSchema, initAuthData.rejected(null, '', undefined, 'error'))
		).toEqual(expected);
	});
});
