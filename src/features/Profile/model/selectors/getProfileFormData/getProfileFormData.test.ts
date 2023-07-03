import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import Image from '@/shared/assets/tests/storybook.jpg';
import { getProfileFormData } from './getProfileFormData';

describe('getProfileFormData.test', () => {
	test('getFormData', () => {
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
				formData: data,
			},
		};
		expect(getProfileFormData(state as StateSchema)).toEqual(data);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileFormData(state as StateSchema)).toEqual(undefined);
	});
});
