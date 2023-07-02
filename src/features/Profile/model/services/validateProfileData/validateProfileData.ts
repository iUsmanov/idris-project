import { Profile, ValidateProfileError } from '../../types/profile';

export const validateProfileErrors = (profile?: Profile) => {
	const errors: ValidateProfileError[] = [];

	if (!profile) {
		errors.push('noData');
	}

	if (!profile?.first) {
		errors.push('incorrectFirstName');
	}

	if (!profile?.lastname) {
		errors.push('incorrectLastName');
	}

	if (!profile?.username) {
		errors.push('incorrectUsername');
	}

	if (!profile?.age) {
		errors.push('incorrectAge');
	}

	if (!profile?.avatar) {
		errors.push('incorrectAvatarLink');
	}

	if (!profile?.city) {
		errors.push('incorrectCity');
	}

	return errors;
};
