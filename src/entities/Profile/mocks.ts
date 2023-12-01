import { Currency } from '@/entities/Currency/testing';
import { Country } from '@/entities/Country/testing';
import { Profile } from './model/types/profile';

export const mockProfile: Profile = {
	id: '1',
	age: 30,
	avatar: '../../shared/assets/tests/storybook.jpg',
	city: 'Moscow',
	currency: Currency.RUB,
	country: Country.ARMENIA,
	first: 'Mickle',
	lastname: 'Jackson',
	username: 'Mick',
};
