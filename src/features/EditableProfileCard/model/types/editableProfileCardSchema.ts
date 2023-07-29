import { Profile } from '@/entities/Profile';

export type ValidateProfileError =
	| 'serverError'
	| 'noData'
	| 'incorrectFirstName'
	| 'incorrectLastName'
	| 'incorrectAge'
	| 'incorrectCity'
	| 'incorrectUsername'
	| 'incorrectAvatarLink';

export interface ProfileSchema {
	data?: Profile;
	formData?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	validateErrors?: ValidateProfileError[];
}
