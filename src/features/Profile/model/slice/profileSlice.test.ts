import { Currency } from '@/entities/Currency';
import { Profile, ProfileSchema, ValidateProfileError } from '../types/profile';
import { profileActions, profileReducer } from './profileSlice';
import { Country } from '@/entities/Country';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

describe('profileSlice.test', () => {
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
	test('set Readonly to false', () => {
		const state: DeepPartial<ProfileSchema> = { readonly: true };
		expect(profileReducer(state as ProfileSchema, profileActions.setReadonly())).toEqual({
			readonly: false,
		});
	});
	test('set Readonly to true', () => {
		const state: DeepPartial<ProfileSchema> = { readonly: false };
		expect(profileReducer(state as ProfileSchema, profileActions.setReadonly())).toEqual({
			readonly: true,
		});
	});
	test('cancel Edit', () => {
		const formData = { ...data, first: '', lastame: '', username: '' };
		const state: DeepPartial<ProfileSchema> = {
			data,
			formData,
			validateErrors: ['incorrectFirstName', 'incorrectLastName', 'incorrectUsername'],
		};
		const expected: ProfileSchema = {
			data,
			formData: data,
			validateErrors: undefined,
			readonly: true,
		};
		expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual(expected);
	});
	test('setFormData', () => {
		const state: DeepPartial<ProfileSchema> = {
			formData: data,
		};
		const payload: Profile = {
			first: 'Changed firstname',
			lastname: 'Changed lastname',
		};
		const expected: ProfileSchema = {
			formData: { ...data, ...payload },
		};
		expect(profileReducer(state as ProfileSchema, profileActions.setFormData(payload))).toEqual(
			expected
		);
	});
	// ! FETCH PROFILE DATA
	// ! FETCH PROFILE DATA
	// ! FETCH PROFILE DATA
	test('fetchProfileData pending', () => {
		const state: DeepPartial<ProfileSchema> = {
			data,
			formData: data,
			isLoading: false,
			error: 'error',
		};
		const expected: ProfileSchema = {
			data: undefined,
			formData: undefined,
			error: undefined,
			isLoading: true,
		};
		expect(profileReducer(state as ProfileSchema, fetchProfileData.pending)).toEqual(expected);
	});
	test('fetchProfileData fulfilled', () => {
		const state: DeepPartial<ProfileSchema> = {
			data: undefined,
			formData: undefined,
			error: undefined,
			isLoading: true,
		};
		const payload: Profile = data;
		const expected: ProfileSchema = {
			data,
			formData: data,
			error: undefined,
			isLoading: false,
		};
		expect(
			profileReducer(state as ProfileSchema, fetchProfileData.fulfilled(payload, '', ''))
		).toEqual(expected);
	});
	test('fetchProfileData reject', () => {
		const state: DeepPartial<ProfileSchema> = {
			error: undefined,
			isLoading: true,
		};
		const expected: ProfileSchema = {
			isLoading: false,
			error: 'error',
		};
		expect(
			profileReducer(state as ProfileSchema, fetchProfileData.rejected(null, '', '', 'error'))
		).toEqual(expected);
	});
	// !UPDATE PROFILE DATA
	// !UPDATE PROFILE DATA
	// !UPDATE PROFILE DATA

	test('updateProfileData pending', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: false,
			error: 'error',
			validateErrors: ['incorrectFirstName', 'incorrectLastName'],
		};
		const expected: ProfileSchema = {
			isLoading: true,
			validateErrors: undefined,
			error: undefined,
		};
		expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual(expected);
	});

	test('updateProfileData fulfilled', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: true,
			readonly: false,
		};
		const expected: ProfileSchema = {
			isLoading: false,
			data: data,
			formData: data,
			readonly: true,
		};
		expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ''))).toEqual(
			expected
		);
	});

	test('updateProfileData rejected', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: true,
			validateErrors: undefined,
		};
		const payload: ValidateProfileError[] = ['incorrectFirstName', 'incorrectLastName'];
		const expected: ProfileSchema = {
			isLoading: false,
			validateErrors: payload,
		};
		expect(
			profileReducer(
				state as ProfileSchema,
				updateProfileData.rejected(null, '', undefined, payload)
			)
		).toEqual(expected);
	});
});
