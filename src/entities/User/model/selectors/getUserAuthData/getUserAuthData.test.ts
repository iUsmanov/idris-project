import { StateSchema } from '@/app/providers/StoreProvider/testing';
import { mockUser } from '../../../mocks';
import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData', () => {
	test('Normal', () => {
		const state: DeepPartial<StateSchema> = {
			user: {
				authData: mockUser,
			},
		};

		expect(getUserAuthData(state as StateSchema)).toEqual(mockUser);
	});

	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};

		expect(getUserAuthData(state as StateSchema)).toEqual(undefined);
	});
});
