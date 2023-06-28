import { getLoginIsLoading } from './getLoginIsLoading';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getLoginIsLoading.test', () => {
	test('When is loading', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {
				isLoading: true,
			},
		};
		expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
	});

	test('With undefined', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {},
		};
		expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
	});
});
