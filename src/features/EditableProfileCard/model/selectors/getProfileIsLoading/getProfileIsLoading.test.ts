import { StateSchema } from '@/app/providers/StoreProvider/testing';
import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileIsLoading.test', () => {
	test('getIsLoading', () => {
		const state: DeepPartial<StateSchema> = {
			profile: { isLoading: true },
		};
		expect(getProfileIsLoading(state as StateSchema)).toEqual(true);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileIsLoading(state as StateSchema)).toEqual(false);
	});
});
