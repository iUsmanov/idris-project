import { StateSchema } from '@/app/providers/StoreProvider/testing';
import { getProfileFormData } from './getProfileFormData';
import { mockProfile } from '@/entities/Profile/testing';

describe('getProfileFormData.test', () => {
	test('getFormData', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				formData: mockProfile,
			},
		};
		expect(getProfileFormData(state as StateSchema)).toEqual(mockProfile);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileFormData(state as StateSchema)).toEqual(undefined);
	});
});
