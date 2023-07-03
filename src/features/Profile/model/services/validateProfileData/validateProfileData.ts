import { Profile, ValidateProfileError } from '../../types/profile';

export const validateProfileErrors = (profile?: Profile) => {
	const errors: ValidateProfileError[] = [];

	if (!profile) {
		errors.push('noData');
		return errors;
	}

	const { first, age, avatar, city, lastname, username } = profile;

	if (!first && !age && !avatar && !city && !lastname && !username) {
		errors.push('noData');
		return errors;
	}
	if (!first) {
		errors.push('incorrectFirstName');
	}

	if (!lastname) {
		errors.push('incorrectLastName');
	}

	if (!username) {
		errors.push('incorrectUsername');
	}

	if (!age) {
		errors.push('incorrectAge');
	}

	if (!avatar) {
		errors.push('incorrectAvatarLink');
	}

	if (!city) {
		errors.push('incorrectCity');
	}

	return errors;
};
