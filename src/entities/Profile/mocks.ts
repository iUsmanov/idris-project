import { Currency } from '@/entities/Currency/testing';
import { Country } from '@/entities/Country/testing';
import { Profile } from './model/types/profile';
import Image from '@/shared/assets/tests/storybook.jpg';

const pathToAvatar = '../../shared/assets/tests/storybook.jpg';

export const mockProfile: Profile = {
	id: '1',
	age: 30,
	avatar: Image,
	city: 'Moscow',
	currency: Currency.RUB,
	country: Country.ARMENIA,
	first: 'Mickle',
	lastname: 'Jackson',
	username: 'Mick',
};
