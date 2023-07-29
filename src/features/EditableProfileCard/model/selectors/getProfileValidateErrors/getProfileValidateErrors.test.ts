import { StateSchema } from '@/app/providers/StoreProvider/testing';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';

describe('getProfileValidateErrors.test', () => {
	test('getProfileValidateErrors', () => {
		const errors: ValidateProfileError[] = [
			'incorrectAge',
			'incorrectAvatarLink',
			'incorrectFirstName',
		];
		const state: DeepPartial<StateSchema> = {
			profile: { validateErrors: errors },
		};
		expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
	});
});
