import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../types/user';
import { UserSettings } from '../types/userSettings';

interface SetUserSettingsArg {
	userId: string;
	userSettings: UserSettings;
}

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		setUserSettings: build.mutation<User, SetUserSettingsArg>({
			query: ({ userId, userSettings }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: {
					jsonSettings: userSettings,
				},
			}),
		}),
		getUserDataById: build.query<User, string>({
			query: (userId) => ({
				url: `/users/${userId}`,
				method: 'GET',
			}),
		}),
	}),
});

export const setUserSettingsMutation = userApi.endpoints.setUserSettings.initiate;
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
