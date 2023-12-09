import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { saveUserSettings } from './saveUserSettings';
import { setUserSettingsMutation } from '../../api/userApi';
import { mockUser } from '../../../mocks';

jest.mock('../../api/userApi');
const mockSetUserSettingsMutation = setUserSettingsMutation as jest.Mock;

describe('saveUserSettings.test', () => {
	test('UserId is not defined', async () => {
		const thunk = new TestAsyncThunk(saveUserSettings, { user: {} });
		const action = await thunk.callThunk({});

		// EXPECTS
		expect(thunk.api.get).not.toHaveBeenCalled();
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(action.payload).toBe('error');
		expect(action.meta.requestStatus).toBe('rejected');
	});

	test('Error', async () => {
		const thunk = new TestAsyncThunk(saveUserSettings, {
			user: {
				authData: mockUser,
			},
		});
		const action = await thunk.callThunk({});
		mockSetUserSettingsMutation.mockResolvedValue({ status: 403 });

		// EXPECTS
		expect(mockSetUserSettingsMutation).toHaveBeenCalledWith({
			userId: mockUser.id,
			userSettings: mockUser.jsonSettings,
		});
		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
		expect(action.payload).toBe('error');
		expect(action.meta.requestStatus).toBe('rejected');
	});

	// test('Fulfilled', async () => {
	// 	const arg: UserSettings = {
	// 		isArticlesPageWasOpened: true,
	// 		theme: 'app-orange-theme',
	// 	};
	// 	const returnUserSetting = { ...mockUser.jsonSettings, ...arg };
	// 	const thunk = new TestAsyncThunk(saveUserSettings, {
	// 		user: {
	// 			authData: mockUser,
	// 		},
	// 	});
	// 	const action = await thunk.callThunk(arg);
	// 	mockSetUserSettingsMutation.mockReturnValue({ data: mockUser });

	// 	// EXPECTS
	// 	expect(mockSetUserSettingsMutation).toHaveBeenCalledWith({
	// 		userId: mockUser.id,
	// 		userSettings: returnUserSetting,
	// 	});
	// 	expect(thunk.dispatch).toHaveBeenCalledTimes(3);
	// 	expect(action.payload).toEqual(returnUserSetting);
	// 	expect(action.meta.requestStatus).toBe('fulfilled');
	// });
});
