import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileCanEdit } from './getProfileCanEdit';

describe('getProfileCanEdit.test', () => {
	test('Should return true', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				data: { id: '1' },
			},
			user: { authData: { id: '1' } },
		};
		expect(getProfileCanEdit(state as StateSchema)).toEqual(true);
	});
	test('Should return false', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				data: { id: '1' },
			},
			user: { authData: { id: '2' } },
		};
		expect(getProfileCanEdit(state as StateSchema)).toEqual(false);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileCanEdit(state as StateSchema)).toBe(undefined);
	});
});
