import { StateSchema } from '@/app/providers/StoreProvider/testing';
import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly.test', () => {
	test('No readonly', () => {
		const state: DeepPartial<StateSchema> = {
			profile: { readonly: false },
		};
		expect(getProfileReadonly(state as StateSchema)).toEqual(false);
	});
	test('Is readonly', () => {
		const state: DeepPartial<StateSchema> = {
			profile: { readonly: true },
		};
		expect(getProfileReadonly(state as StateSchema)).toEqual(true);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileReadonly(state as StateSchema)).toEqual(undefined);
	});
});
