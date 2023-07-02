import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

export type ValidateProfileError =
	| 'serverError'
	| 'noData'
	| 'incorrectFirstName'
	| 'incorrectLastName'
	| 'incorrectAge'
	| 'incorrectCity'
	| 'incorrectUsername'
	| 'incorrectAvatarLink';

export interface Profile {
	id?: string;
	first?: string;
	lastname?: string;
	age?: number;
	currency?: Currency;
	country?: Country;
	city?: string;
	username?: string;
	avatar?: string;
}

export interface ProfileSchema {
	data?: Profile;
	formData?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	validateErrors?: ValidateProfileError[];
}
