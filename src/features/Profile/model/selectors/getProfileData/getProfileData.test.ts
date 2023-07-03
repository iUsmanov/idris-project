import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import Image from '@/shared/assets/tests/storybook.jpg';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
	test('getProfileData', () => {
		const data = {
			age: 30,
			avatar: Image,
			city: 'Moscow',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: 'Jackson',
			lastname: 'Styled',
			username: 'Chotkiy pocik',
		};
		const state: DeepPartial<StateSchema> = {
			profile: {
				data,
			},
		};
		expect(getProfileData(state as StateSchema)).toEqual(data);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileData(state as StateSchema)).toEqual(undefined);
	});
});
