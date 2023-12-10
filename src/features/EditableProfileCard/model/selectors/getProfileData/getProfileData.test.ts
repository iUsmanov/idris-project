import { StateSchema } from '@/app/providers/StoreProvider/testing';
import { getProfileData } from './getProfileData';
import { mockProfile } from '@/entities/Profile/testing';

describe('getProfileData.test', () => {
	test('getProfileData', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				data: mockProfile,
			},
		};
		expect(getProfileData(state as StateSchema)).toEqual(mockProfile);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileData(state as StateSchema)).toEqual(undefined);
	});
});
