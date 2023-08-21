import { buildSelector } from '@/shared/lib/store';
import { UserSettings } from '../../types/userSettings';

const defaultUserSettings: UserSettings = {};

export const [useUserSettings, getUserSettings] = buildSelector(
	(state) => state.user.authData?.jsonSettings ?? defaultUserSettings
);

// export const [useUserSettingByKey, getUserSettingByKey] = buildSelector(
// 	(state, key: keyof UserSettings) => state.user.authData?.jsonSettings?.[key]
// );
