import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserSettings } from '../../types/userSettings';
import { getUserAuthData } from '../../selectors/getUserAuthData/getUserAuthData';
import { getUserSettings } from '../../selectors/getUserSettings/getUserSettings';
import { setUserSettingsMutation } from '../../api/userApi';

export const saveUserSettings = createAsyncThunk<UserSettings, UserSettings, ThunkConfig<string>>(
	'user/saveUserSettings',
	async (newUserSettings, thunkApi) => {
		const { rejectWithValue, dispatch, getState } = thunkApi;
		const userData = getUserAuthData(getState());
		const currentSettings = getUserSettings(getState());

		if (!userData) {
			return rejectWithValue('error');
		}

		try {
			const response = await dispatch(
				setUserSettingsMutation({
					userId: userData.id,
					userSettings: {
						...currentSettings,
						...newUserSettings,
					},
				})
			).unwrap();

			if (!response.jsonSettings) {
				return rejectWithValue('error');
			}

			return response.jsonSettings;
		} catch (e) {
			return rejectWithValue('error');
		}
	}
);
