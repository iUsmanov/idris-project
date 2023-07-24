import { Currency } from '@/entities/Currency/testing';
import { validateProfileErrors } from './validateProfileData';
import { Country } from '@/entities/Country/testing';
import { Profile, ValidateProfileError } from '@/entities/Profile/testing';

describe('validateProfileErrors.test', () => {
	test('With no errors', () => {
		const data: Profile = {
			age: 30,
			avatar: 'https://',
			city: 'Moscow',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: 'Jackson',
			lastname: 'Styled',
			username: 'Chotkiy pocik',
		};
		const errors: ValidateProfileError[] = validateProfileErrors(data);
		expect(errors).toEqual([]);
	});
	test('With empty data', () => {
		const data: Profile = {};
		const errors: ValidateProfileError[] = validateProfileErrors(data);
		expect(errors).toEqual(['noData']);
	});
	test('With undefined data', () => {
		const data = undefined;
		const errors: ValidateProfileError[] = validateProfileErrors(data);
		expect(errors).toEqual(['noData']);
	});
	test('With empty all fields', () => {
		const data: Profile = {
			age: 0,
			avatar: '',
			city: '',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: '',
			lastname: '',
			username: '',
		};
		const errors: ValidateProfileError[] = validateProfileErrors(data);
		expect(errors).toEqual(['noData']);
	});
	test('With zero in age field', () => {
		const data: Profile = {
			age: 0,
			avatar: 'https://',
			city: 'Moscow',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: 'Jackson',
			lastname: 'Styled',
			username: 'Chotkiy pocik',
		};
		const errors: ValidateProfileError[] = validateProfileErrors(data);
		expect(errors).toEqual(['incorrectAge']);
	});
	test('With one empty field', () => {
		const data: Profile = {
			age: 30,
			avatar: 'https://',
			city: 'Moscow',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: 'Jackson',
			lastname: '',
			username: 'Chotkiy pocik',
		};
		const errors: ValidateProfileError[] = validateProfileErrors(data);
		expect(errors).toEqual(['incorrectLastName']);
	});
	test('With a few errors', () => {
		const data: Profile = {
			age: 0,
			avatar: 'https://',
			city: 'Moscow',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: '',
			lastname: '',
			username: 'Chotkiy pocik',
		};
		const errors: ValidateProfileError[] = validateProfileErrors(data);
		expect(errors).toEqual(['incorrectFirstName', 'incorrectLastName', 'incorrectAge']);
	});
});
